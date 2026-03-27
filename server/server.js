const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// serve frontend from /public
app.use(express.static(path.join(__dirname, "../public")));

// default route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

// API routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const bookingRoutes = require("./routes/booking");
app.use("/api", bookingRoutes);

const approvalRoutes = require("./routes/approval");
app.use("/api", approvalRoutes);

const notificationRoutes = require("./routes/notification");
app.use("/api", notificationRoutes);


// database
console.log("ENV MONGO_URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB ERROR:", err));

    const Notification = require("./models/notification");
const Booking = require("./models/booking");

setInterval(async () => {
    try {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const today = `${year}-${month}-${day}`;

        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const bookings = await Booking.find({
            date: today,
            reminderSent: false
        });

        for (const booking of bookings) {
            const [startHour, startMinute] = booking.startTime.split(":").map(Number);
            const bookingStartMinutes = startHour * 60 + startMinute;

            const difference = bookingStartMinutes - currentMinutes;

            if (difference === 30) {
                await Notification.create({
                    userEmail: booking.userEmail,
                    title: "Booking Reminder",
                    message: `Reminder: Your booking for ${booking.roomName} starts in ${difference} minute(s).`,
                    type: "reminder"
                });

                booking.reminderSent = true;
                await booking.save();
            }
        }
    } catch (err) {
        console.log("BOOKING REMINDER ERROR:", err);
    }
}, 60 * 1000);
// server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
