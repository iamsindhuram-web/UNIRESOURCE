const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    day: {
        type: String
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    reminderSent: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);