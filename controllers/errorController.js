// Global error handler
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    err.message = err.message || "Some error occured";

    // Duplicate data error
    if (err.code === 11000) {
        err.statusCode = 400;
        err.status = "fail";
        const customErr = handleDuplicateDataErrors(err);
        return sendError(err, customErr, res);
    }

    // Default error response
    res.status(err.statusCode).json({
        status: err.status,
        data: {
            errors: {
                message: err.message,
            },
        },
    });
};

// Function to send error response
const sendError = (err, customErr, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        data: {
            errors: customErr,
        },
    });
};

// Function to handle duplicate data errors
const handleDuplicateDataErrors = (err) => {
    const errors = {};
    for (key in err.keyValue) {
        errors[key] = `This ${key} is taken`;
    }

    return errors;
};

module.exports = globalErrorHandler;
