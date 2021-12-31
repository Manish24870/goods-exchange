const validator = require("validator");

const newProductValidator = (data) => {
    const errors = {};

    if (!validator.isInt(data.usedFor)) {
        errors.usedFor = "Used for should be a number";
    }
    if (!validator.isInt(data.expiresIn)) {
        errors.expiresIn = " Expires in should be a number";
    }

    return errors;
};

module.exports = newProductValidator;
