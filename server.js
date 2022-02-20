const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const chalk = require("chalk");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const exchangeRouter = require("./routes/exchangeRoutes");
const adminRouter = require("./routes/adminRoutes");
const globalErrorHandler = require("./controllers/errorController");
const ApiError = require("./utils/apiError");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//Connect to MongoDB database
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log(chalk.inverse.blue("Database connected..."));
    })
    .catch((err) => {
        console.log("ERROR CONNECTING DATABASE");
        console.log(err);
    });

// Mount Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/exchange", exchangeRouter);
app.use("/api/admin", adminRouter);

// Serve the frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    console.log(__dirname + "/client/build");

    app.get("*", (req, res) => {
        res.sendFile(__dirname, "/", "client", "build", "index.html");
    });
}

// Global error handler
app.use(globalErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.inverse.blue(`Server started at port ${port}...`));
});
