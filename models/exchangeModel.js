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
      offerStatus: {
        type: String,
        enum: ["accepted", "rejected", "pending"],
        default: "pending",
      },
      acceptedAt: {
        type: Date,
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
  isExchanged: {
    type: Boolean,
    required: true,
    default: false,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Exchange = mongoose.model("Exchange", exchangeSchema);

module.exports = Exchange;
