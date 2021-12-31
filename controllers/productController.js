const Product = require("../models/productModel");
const inputValidator = require("../validation/inputValidator");
const ApiError = require("../utils/apiError");

// Route = /api/products/create
// Function to create a new product
// Authentication = true
exports.createNewProduct = async (req, res, next) => {
    console.log(req.body);
    const { errors, isValid } = inputValidator(req.body, "create-new-product");
    console.log(errors);

    if (!isValid) {
        return res.status(400).json({
            status: "fail",
            errorType: "invalid-input",
            data: {
                errors,
            },
        });
    }

    // Convert some data to their schema type
    const productKind = req.body.productKind.split(",").map((el) => {
        return el.trim();
    });

    let expiresIn = Number(req.body.expiresIn);
    if (req.body.expiresInType === "days") {
        expiresIn = Date.now() + expiresIn * 24 * 60 * 60 * 1000;
    } else if (req.body.expiresInType === "months") {
        expiresIn = Date.now() + expiresIn * 30 * 24 * 60 * 60 * 1000;
    }

    if (req.body.additionals) {
        const additionals = req.body.additionals.split(",").map((el) => {
            return el.trim();
        });
    }

    const exchangeWith = req.body.exchangeWith.split(",").map((el) => {
        return el.trim();
    });

    const newProduct = new Product({
        name: req.body.productName,
        description: req.body.description,
        owner: req.user._id,
        details: {
            kind: productKind,
            condition: req.body.condition,
            usedFor: `${req.body.usedFor} ${req.body.usedForType}`,
            warranty: "yes" ? true : false,
            expiresIn,
            additionals: req.body.additionals ? additionals : "None",
            exchangeWith,
        },
    });

    // Save the new product
    try {
        await newProduct.save();
        res.status(201).json({
            status: "success",
            data: {
                message: "New product created successfully",
                newProduct,
            },
        });
    } catch (err) {
        next(err);
    }
};

// Route = /api/products
// Function to get all the products
// Authentication = false
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find().sort({
            postedAt: -1,
        });
        res.status(200).json({
            status: "success",
            data: {
                message: "Products fetched successfully",
                products,
            },
        });
    } catch (err) {
        next(err);
    }
};
