const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../models/userModel");
const inputValidator = require("../validation/inputValidator");
const ApiError = require("../utils/apiError");
const isEmpty = require("../utils/isEmpty");

// Function to send a new auth token response
const sendAuthToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    data: {
      message: "Logged in successfully",
      user,
      token,
    },
  });
};

// Route = /api/auth/register
// Function to register a new user
// Authentication = false
exports.registerUser = async (req, res, next) => {
  const { errors, isValid } = inputValidator(req.body, "register-user");

  if (!isValid) {
    return res.status(400).json({
      status: "fail",
      errorType: "invalid-input",
      data: {
        errors,
      },
    });
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await newUser.save();
    newUser.password = undefined;
    sendAuthToken(newUser, res);
  } catch (err) {
    next(err);
  }
};

// Route = /api/auth/login
// Function to login a user
// Authentication = false
exports.loginUser = async (req, res, next) => {
  const { errors, isValid } = inputValidator(req.body);
  if (!isValid) {
    return res.status(400).json({
      status: "fail",
      errorType: "invalid-input",
      data: {
        errors,
      },
    });
  }

  // Check for user in database
  try {
    const foundUser = await User.findOne({
      $or: [
        { username: req.body.usernameOrEmail },
        { email: req.body.usernameOrEmail },
      ],
    }).select("+password");

    // Check if the username or email and password match
    if (
      !foundUser ||
      !(await foundUser.comparePassword(req.body.password, foundUser.password))
    ) {
      return next(
        new ApiError(
          "The given credentials are invalid",
          "invalid-login-error",
          401
        )
      );
    }

    foundUser.password = undefined;
    sendAuthToken(foundUser, res);
  } catch (err) {
    next(err);
  }
};

// Route = /api/auth/get-user/:userId
// Function to get user data
// Authentication = true
exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(
      new ApiError("You are not logged in", "unauthorized-error", 401)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      message: "User fetched successfully",
      user,
    },
  });
};

// Function to update user profile
exports.updateUserProfile = async (req, res, next) => {
  let newUserData = req.body;
  delete newUserData.userImage;
  // Do not validate password if it is empty
  if (isEmpty(req.body.password) && isEmpty(req.body.passwordConfirm)) {
    delete newUserData.password;
    delete newUserData.passwordConfirm;
  }

  let { errors, isValid } = inputValidator(newUserData, "update-user-profile");

  // Check for duplicate email and username
  const foundUserEmail = await User.findOne({ email: newUserData.email });
  if (foundUserEmail && !foundUserEmail._id.equals(req.user._id)) {
    errors.email = "This Email is taken";
    isValid = false;
  }
  const foundUserUsername = await User.findOne({
    username: newUserData.username,
  });
  if (foundUserUsername && !foundUserUsername._id.equals(req.user._id)) {
    errors.username = "This username is taken";
    isValid = false;
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

  // Update necessary fields
  if (req.file) {
    req.user.profileImage = req.file.path.replace(/\\/g, "/");
  }
  if (newUserData.password) {
    req.user.password = newUserData.password;
  }
  req.user.username = newUserData.username;
  req.user.email = newUserData.email;
  req.user.location = newUserData.location;
  req.user.phone = newUserData.phone;

  try {
    await req.user.save({ validateBeforeSave: false });
    req.user.password = undefined;

    res.status(200).json({
      status: "success",
      data: {
        message: "User updated successfully",
        user: req.user,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Function to protect routes
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new ApiError("You are not logged in", "unauthorized-error", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new ApiError(
        "This user does not exist. Please login again.",
        "unauthorized-error",
        401
      )
    );
  }

  req.user = currentUser;
  next();
};

// Function to restrict  routes to specific users
exports.restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          "You are not allowed to perform this action",
          "unauthorized-error",
          403
        )
      );
    }

    next();
  };
};
