const Product = require("../models/productModel");
const inputValidator = require("../validation/inputValidator");
const ApiError = require("../utils/apiError");

// Route = /api/products/create
// Function to create a new product
// Authentication = true
exports.createNewProduct = async (req, res, next) => {
    const { errors, isValid } = inputValidator(req.body, "create-new-product");

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
    if (req.body.expiresInType === "Days") {
        console.log(Date.now());
        expiresIn = Date.now() + expiresIn * 24 * 60 * 60 * 1000;
    } else if (req.body.expiresInType === "Months") {
        expiresIn = Date.now() + expiresIn * 30 * 24 * 60 * 60 * 1000;
    }

    const additionals = req.body.additionals
        ? req.body.additionals.split(",").map((el) => {
              return el.trim();
          })
        : "None";

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
            warranty: req.body.warranty,
            expiresIn,
            additionals,
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
        const products = await Product.find()
            .sort({
                postedAt: -1,
            })
            .populate("owner");
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

// Route = /api/products/:id
// Function to get a single product
// Authentication = false
exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate("owner");
        if (!product) {
            return next(new ApiError("This product doesn't exist.", "not-found-error", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                message: "Product fetched successfully",
                product,
            },
        });
    } catch (err) {
        next(err);
    }
};

// Route = /api/products/:id/question
// Function to ask a new question
// Authentication = true
exports.createNewQuestion = async (req, res, next) => {
    const { errors, isValid } = inputValidator(req.body, "create-new-question");
    if (!isValid) {
        return res.status(400).json({
            status: "fail",
            errorType: "invalid-input",
            data: {
                errors,
            },
        });
    }

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ApiError("This product doesn't exist.", "not-found-error", 404));
        }

        const newQuestion = {
            ques: req.body.question,
            askedBy: req.user._id,
        };
        product.questions.push(newQuestion);
        await product.save();
        res.status(200).json({
            status: "success",
            data: {
                message: "Question asked successfully",
                product,
            },
        });
    } catch (err) {
        next(err);
    }
};

// Route = /api/products/:id/:questionId/answer
// Function to ask a new question
// Authentication = true
exports.createNewAnswer = async (req, res, next) => {
    const { errors, isValid } = inputValidator(req.body, "create-new-answer");
    if (!isValid) {
        return res.status(400).json({
            status: "fail",
            errorType: "invalid-input",
            data: {
                errors,
            },
        });
    }

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ApiError("This product doesn't exist.", "not-found-error", 404));
        }

        const questionIndex = product.questions.findIndex((el) =>
            el._id.equals(req.params.questionId)
        );
        product.questions[questionIndex].ans = req.body.answer;
        await product.save();

        res.status(200).json({
            status: "success",
            data: {
                message: "Answer added successfully",
                product,
            },
        });
    } catch (err) {
        next(err);
    }
};

// Route = /api/products/:id/favorite
// Function to favorite a product
// Authentication = true
exports.favoriteProduct = async (req, res, next) => {
    try {
        const favoritedIndex = req.user.favorites.findIndex((el) =>
            el.productId.equals(req.params.id)
        );

        // If the item is already favorited
        if (favoritedIndex >= 0) {
            req.user.favorites.splice(favoritedIndex, 1);
            await req.user.save();
            res.status(200).json({
                status: "success",
                data: {
                    message: "Product unfavorited successfully",
                    user: req.user,
                },
            });
        } else {
            req.user.favorites.push({
                productId: req.params.id,
            });
            await req.user.save();
            res.status(200).json({
                status: "success",
                data: {
                    message: "Product favorited successfully",
                    user: req.user,
                },
            });
        }
    } catch (err) {
        next(err);
    }
};
