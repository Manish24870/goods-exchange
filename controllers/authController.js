const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../models/userModel");
const inputValidator = require("../validation/inputValidator");
const ApiError = require("../utils/apiError");

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
            $or: [{ username: req.body.usernameOrEmail }, { email: req.body.usernameOrEmail }],
        }).select("+password");

        // Check if the username or email and password match
        if (
            !foundUser ||
            !(await foundUser.comparePassword(req.body.password, foundUser.password))
        ) {
            return next(
                new ApiError("The given credentials are invalid", "invalid-login-error", 401)
            );
        }

        foundUser.password = undefined;
        sendAuthToken(foundUser, res);
    } catch (err) {
        next(err);
    }
};

//Function to protect routes
exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ApiError("You are not logged in", "unauthorized-error", 401));
    }

    console.log(token);
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return next(
            new ApiError("This user does not exist. Please login again.", "unauthorized-error", 401)
        );
    }

    req.user = currentUser;
    next();
};
