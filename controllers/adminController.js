const User = require("../models/userModel");
const Product = require("../models/productModel");

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
