const validator = require("validator");

const isEmpty = require("../utils/isEmpty");
const registerValidator = require("./registerValidator");
const newProductValidator = require("./newProductValidator");

const inputValidator = (data, type) => {
    // If the user doesn't send any data
    if (isEmpty(data)) {
        return {
            errors: {
                message: "Data validation failed",
            },
            isValid: false,
        };
    }

    let errors = {};

    // Change undefined values to string
    for (const key in data) {
        data[key] = !isEmpty(data[key]) ? data[key] : "";
    }

    // Register user validation
    if (type === "register-user") {
        errors = registerValidator(data);
    }

    // New product form validation
    if (type === "create-new-product") {
        errors = newProductValidator(data);
    }

    // Check for empty string
    for (const key in data) {
        if (validator.isEmpty(String(data[key])) && key !== "additionals") {
            let keyText = key.replace(/([a-z])([A-Z])/g, "$1 $2");
            keyText = keyText.charAt(0).toUpperCase() + keyText.slice(1);
            errors[key] = `${keyText} is required`;
        }
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = inputValidator;
