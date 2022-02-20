const Product = require("../models/productModel");
const User = require("../models/userModel");
const Exchange = require("../models/exchangeModel");
const inputValidator = require("../validation/inputValidator");
const ApiError = require("../utils/apiError");
const isEmpty = require("../utils/isEmpty");

// Route = /api/products/create
// Function to create a new product
// Authentication = true
exports.createNewProduct = async (req, res, next) => {
  let { errors, isValid } = inputValidator(req.body, "create-new-product");

  if (req.files.length < 3) {
    isValid = false;
    errors.productImages = "Please upload at least 3 images";
  }

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

  const productImages = req.files.map((file) => {
    const filePath = file.path.replace(/\\/g, "/");
    return {
      url: filePath,
    };
  });

  const newProduct = new Product({
    name: req.body.productName,
    description: req.body.description,
    owner: req.user._id,
    images: productImages,
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
      return next(
        new ApiError("This product doesn't exist.", "not-found-error", 404)
      );
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

// Route = /api/products/:id
// Function to delete a product
// Authentication = true [owner]
exports.deleteAProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.productId
    );

    // Delete favorites of this product
    const users = await User.find();
    users.forEach((user) => {
      user.favorites.forEach(async (favorite, index) => {
        if (favorite.product.equals(req.params.productId)) {
          user.favorites.splice(index, 1);
          await user.save();
        }
      });
    });

    // Delete exchanges where this is the product wanted
    await Exchange.deleteMany({
      productWanted: req.params.productId,
    });

    // Delete exchanges where this product is given by initiator
    const exchanges = await Exchange.find();
    exchanges.forEach((exchange) => {
      exchange.initiator.forEach(async (el, index) => {
        if (el.initiatorProduct.equals(req.params.productId)) {
          exchange.initiator.splice(index, 1);
          await exchange.save();
        }
      });
    });

    res.status(200).json({
      status: "success",
      data: {
        message: "Product deleted successfully",
        deletedProduct,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Route = /api/products/report/:productId
// Function to report a product
// Authentication = true
exports.reportAProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    const reportedIndex = product.reported.findIndex((el) =>
      req.user._id.equals(el.reportedBy)
    );

    if (reportedIndex >= 0) {
      return next(
        new ApiError("Product already reported", "already-reported-error", 400)
      );
    }

    const newReport = {
      reportedBy: req.user._id,
    };
    product.reported.push(newReport);
    product.reportedCount++;
    await product.save();
    res.status(200).json({
      status: "success",
      data: {
        message: "Product reported successfully",
        product,
      },
    });
    // const product=await
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
      return next(
        new ApiError("This product doesn't exist.", "not-found-error", 404)
      );
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
// Function to answer a question
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
      return next(
        new ApiError("This product doesn't exist.", "not-found-error", 404)
      );
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
      el.product.equals(req.body.productId)
    );

    // If the item is already favorited
    if (favoritedIndex >= 0) {
      req.user.favorites.splice(favoritedIndex, 1);
      await req.user.save();
      res.status(200).json({
        status: "success",
        data: {
          message: "Product unfavorited",
          user: req.user,
        },
      });
    } else {
      req.user.favorites.push({
        product: req.body.productId,
        owner: req.body.productOwnerId,
      });
      await req.user.save();
      res.status(200).json({
        status: "success",
        data: {
          message: "Product favorited",
          user: req.user,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};
