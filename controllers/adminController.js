const User = require("../models/userModel");

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
