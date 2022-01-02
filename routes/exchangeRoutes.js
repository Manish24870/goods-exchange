const express = require("express");

const authController = require("../controllers/authController");
const exchangeController = require("../controllers/exchangeController");

const router = express.Router();

router.post("/create", authController.protect, exchangeController.createNewExchange);
router.get("/my-products", authController.protect, exchangeController.getMyProducts);

module.exports = router;
