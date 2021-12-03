const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();

const app = express();

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

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.inverse.blue(`Server started at port ${port}...`));
});
