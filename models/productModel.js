const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    details: {
        kind: {
            type: Array,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
        usedFor: {
            type: String,
            required: true,
        },
        warranty: {
            type: Boolean,
            required: true,
        },
        timeRemaining: {
            type: Date,
            required: true,
        },
        additionals: {
            type: Array,
        },
        exchangeWith: {
            type: Array,
            required: true,
        },
    },
    images: [
        {
            url: {
                type: String,
                trim: true,
            },
        },
    ],
    questions: [
        {
            ques: {
                type: String,
                trim: true,
            },
            ans: {
                type: String,
                trim: true,
            },
            askedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        },
    ],
    postedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;