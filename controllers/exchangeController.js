const Exchange = require("../models/exchangeModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");
const isEmpty = require("../utils/isEmpty");

// Route = /api/exchange/create
// Function to create a new exchange
// Authentication = true
exports.createNewExchange = async (req, res, next) => {
  try {
    let exchange;
    exchange = await Exchange.findOne({
      productWanted: req.body.productWanted,
    });

    // If the exchange already exists
    if (exchange) {
      initiatorIndex = exchange.initiator.findIndex((el) =>
        el.initiatorId.equals(req.user._id)
      );
      // If this person has already initiated the exchange
      if (initiatorIndex >= 0) {
        exchange.initiator.splice(initiatorIndex, 1);
      } else {
        const initiatorData = {
          initiatorId: req.user._id,
          initiatorProduct: req.body.productGiven,
        };
        exchange.initiator.push(initiatorData);
      }
    } else {
      // If the exchange doesn't already exist, create a new exchange
      const initiatorData = [
        {
          initiatorId: req.user._id,
          initiatorProduct: req.body.productGiven,
        },
      ];
      exchange = new Exchange({
        initiator: initiatorData,
        owner: req.body.productOwner,
        productWanted: req.body.productWanted,
      });
    }

    await exchange.save();
    res.status(201).json({
      status: "success",
      data: {
        message: "Exchange initiated successfully",
        exchange,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Route = /api/exchange/my-products
// Function to get my products
// Authentication = true
exports.getMyProducts = async (req, res, next) => {
  try {
    const myProducts = await Product.find({ owner: req.user._id });

    res.status(200).json({
      status: "success",
      data: {
        message: "Your products have been fetched successfully",
        myProducts,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Route = /api/exchange/my-favorites
// Function to get my favorites
// Authentication = true
exports.getMyFavorites = async (req, res, next) => {
  try {
    const populatedUser = await User.findById(req.user._id)
      .populate("favorites.product")
      .populate("favorites.owner");

    res.status(200).json({
      status: "success",
      data: {
        message: "Favorites fetched successfully",
        myFavorites: populatedUser.favorites,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Route = /api/exchange/my-initiates
// Function to get my initiates
// Authentication = true
exports.getMyInitiates = async (req, res, next) => {
  try {
    const myInitiates = await Exchange.find({
      "initiator.initiatorId": req.user._id,
    })
      .populate("initiator.initiatorProduct")
      .populate("owner")
      .populate("productWanted");
    res.status(200).json({
      status: "success",
      data: {
        myInitiates,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Route = /api/exchange/my-offers
// Function to get my offers
// Authentication = true
exports.getMyOffers = async (req, res, next) => {
  try {
    const myOffers = await Exchange.find({ owner: req.user._id })
      .populate("initiator.initiatorId")
      .populate("initiator.initiatorProduct")
      .populate("owner")
      .populate("productWanted");

    res.status(200).json({
      status: "success",
      data: {
        myOffers,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Route = /api/exchange/reject
// Function to reject an offer
// Authentication = true
exports.rejectOffer = async (req, res, next) => {
  try {
    const exchange = await Exchange.findById(req.body.exchangeId);
    const initiatorIndex = exchange.initiator.findIndex((el) =>
      el._id.equals(req.body.initiatorItemId)
    );
    exchange.initiator[initiatorIndex].offerStatus = "rejected";
    await exchange.save();
    res.status(200).json({
      status: "success",
      data: {
        message: "Offer rejected",
        exchange,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Route = /api/exchange/accept
// Function to accept an offer
// Authentication = true
exports.acceptOffer = async (req, res, next) => {
  try {
    const exchange = await Exchange.findById(req.body.exchangeId);
    const initiatorIndex = exchange.initiator.findIndex((el) =>
      el._id.equals(req.body.initiatorItemId)
    );

    // If the item has aready been exchanged
    if (exchange.isExchanged) {
      return next(
        new ApiError(
          "You have already accepted another offer",
          "already-exchanged-error",
          400
        )
      );
    }

    exchange.isExchanged = true;
    exchange.initiator[initiatorIndex].offerStatus = "accepted";
    exchange.initiator[initiatorIndex].acceptedAt = Date.now();

    exchange.initiator.forEach((el, index) => {
      if (index !== initiatorIndex) {
        el.offerStatus = "rejected";
      }
    });

    await exchange.save();
    res.status(200).json({
      status: "success",
      data: {
        message: "Offer accepted",
        exchange,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Route = /api/exchange/review
// Function to write a review
// Authentication = true
exports.createAReview = async (req, res, next) => {
  const reputationValues = [-15, -12, -9, -6, 1, 3, 6, 10, 13, 15];

  try {
    const reviewedUser = await User.findById(req.body.reviewedFor);

    // Logic flawed (Cannot review another exchange between two same users)
    const reviewIndex = reviewedUser.reviews.findIndex((review) =>
      req.user._id.equals(review.reviewedBy)
    );

    // If the user has already reviewed the exchange
    if (reviewIndex >= 0) {
      return next(
        new ApiError("Exchange already reviewed", "already-reviewed-error", 400)
      );
    }

    // Create and add a new review
    const newReview = {
      reviewedBy: req.user._id,
      exchangeId: req.body.exchangeId,
      reviewNumber: req.body.reviewNumber,
      reviewText: isEmpty(req.body.reviewText) ? "" : req.body.reviewText,
    };
    reviewedUser.reviews.push(newReview);
    // Calculate the new reputation value
    reviewedUser.reputation =
      reviewedUser.reputation +
      reputationValues[Number(req.body.reviewNumber) - 1];

    if (reviewedUser.reputation > 100) {
      reviewedUser.reputation = 100;
    }
    if (reviewedUser.reputation < 0) {
      reviewedUser.reputation = 0;
    }

    await reviewedUser.save();
    res.status(201).json({
      status: "success",
      data: {
        message: "User reviewed successfully",
        reviewedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};
