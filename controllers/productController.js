const Product = require("../models/productModel");
const inputValidator = require("../validation/inputValidator");
const ApiError = require("../utils/apiError");

exports.createNewProduct = (req, res, next) => {
    console.log(req.body);
    console.log(req.user);
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
};
