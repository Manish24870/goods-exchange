const mongoose = require("mongoose");

const exchangeSchema = new mongoose.Schema({
    initiator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    completed: {
        type: Boolean,
        required: true,
        default: false,
    },

    completedAt: {
        type: Date,
    },

    initiatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const Exchange = mongoose.model("Exchange", exchangeSchema);

module.exports = Exchange;
