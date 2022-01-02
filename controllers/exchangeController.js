const Exchange = require("../models/exchangeModel");
const Product = require("../models/productModel");

// Route = /api/exchange/create
// Function to create a new exchange
// Authentication = true
exports.createNewExchange = async (req, res, next) => {
    console.log(req.body);
};

// Route = /api/products/
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
