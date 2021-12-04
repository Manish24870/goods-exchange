const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();

const authRouter = require("./routes/authRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// Middlewares
app.use(express.json());

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

// Global error handler
app.use(globalErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.inverse.blue(`Server started at port ${port}...`));
});
