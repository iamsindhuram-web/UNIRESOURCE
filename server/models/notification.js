const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    type: {
        type: String,
        default: "general"
    }, // approval / booking / request / reminder

    isRead: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);