const mongoose = require("mongoose");

const exchangeSchema = new mongoose.Schema({
    initiator: [
        {
            initiatorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            initiatorProduct: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            initiatedAt: {
                type: Date,
                required: true,
                default: Date.now,
            },
        },
    ],

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    productWanted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
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

    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const Exchange = mongoose.model("Exchange", exchangeSchema);

module.exports = Exchange;
