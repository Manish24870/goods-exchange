const Exchange = require("../models/exchangeModel");
const Product = require("../models/productModel");

// Route = /api/exchange/create
// Function to create a new exchange
// Authentication = true
exports.createNewExchange = async (req, res, next) => {
    try {
        let exchange;
        exchange = await Exchange.findOne({ productWanted: req.body.productWanted });

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

// Route = /api/exchange/my-initiates
// Function to get my initiates
// Authentication = true
exports.getMyInitiates = async (req, res, next) => {
    try {
        const myInitiates = await Exchange.find({ "initiator.initiatorId": req.user._id });
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
