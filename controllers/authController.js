const User = require("../models/userModel");
const inputValidator = require("../validation/inputValidator");

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
        res.send({
            message: "success",
        });
    } catch (err) {
        next(err);
    }
};

exports.login = () => {};
