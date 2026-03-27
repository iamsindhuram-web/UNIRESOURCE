const mongoose = require("mongoose");

const ApprovalSchema = new mongoose.Schema({
    resourceType: {
        type: String,
        required: true
    }, // "Room" or "Equipment"

    resourceName: {
        type: String,
        required: true
    },

    requestedBy: {
        type: String,
        required: true
    }, // user email

    requesterRole: {
        type: String,
        required: true
    }, // Student / Faculty / Administrator

    approverRole: {
        type: String,
        required: true
    }, // Faculty / Administrator

    date: {
        type: String
    },

    day: {
        type: String
    },

    startTime: {
        type: String
    },

    endTime: {
        type: String
    },

    status: {
        type: String,
        default: "Pending"
    }, // Pending / Approved / Rejected

    remarks: {
        type: String,
        default: ""
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.Approval || mongoose.model("Approval", ApprovalSchema);