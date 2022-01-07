const User = require("../models/userModel");
const Product = require("../models/productModel");
const Exchange = require("../models/exchangeModel");

// Route = /api/admin/get-users
// Function to get all the users
// Authentication = true [admin]
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: "success",
      data: {
        message: "Users fetched successfully",
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Route = /api/admin/delete-user/:userId
// Function to delete a user
// Authentication = true [admin]
exports.deleteAUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    // Delete products created by this user
    await Product.deleteMany({ owner: req.params.userId });

    // Delete exchanges where this user is the owner
    await Exchange.deleteMany({
      owner: req.params.userId,
    });

    // Delete exchange initiates initiated by this user
    const exchanges = await Exchange.find();
    exchanges.forEach((exchange) => {
      exchange.initiator.forEach(async (el, index) => {
        if (el.initiatorId.equals(req.params.userId)) {
          exchange.initiator.splice(index, 1);
          await exchange.save();
        }
      });
    });

    // Delete favorites of this product
    const users = await User.find();
    users.forEach((user) => {
      user.favorites.forEach(async (favorite, index) => {
        if (favorite.owner.equals(req.params.userId)) {
          user.favorites.splice(index, 1);
          await user.save();
        }
      });
    });

    res.status(200).json({
      status: "success",
      data: {
        message: "User deleted successfully",
        deletedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Route = /api/admin/promote-user
// Function to promote a user to admin
// Authentication = true [admin]
exports.promoteAUser = async (req, res, next) => {
  try {
    const promotedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        role: "admin",
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        message: "User promoted successfully",
        promotedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};
// Route = /api/admin/demote-user
// Function to demote a user to normal user
// Authentication = true [admin]
exports.demoteAUser = async (req, res, next) => {
  try {
    const demotedUser = await User.findByIdAndUpdate(
      req.body.userId,
      {
        role: "user",
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        message: "User demoted successfully",
        demotedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Route = /api/admin/get-products
// Function to get all the products
// Authentication = true [admin]
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("owner").sort({
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

// Route = /api/admin/delete-product/:productId
// Function to delete a product
// Authentication = true [admin]
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
