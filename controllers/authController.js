const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const inputValidator = require("../validation/inputValidator");

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

// Route = /api/auth./register
// Function to register a new user
exports.register = async (req, res, next) => {
    console.log(req.body);
    const { errors, isValid } = inputValidator(req.body, "register-user");

    if (!isValid) {
        return res.status(400).json({
            status: "fail",
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

exports.login = () => {};
