const express = require("express");

const authController = require("../controllers/authController");
const exchangeController = require("../controllers/exchangeController");

const router = express.Router();

router.post("/create", authController.protect, exchangeController.createNewExchange);
router.get("/my-products", authController.protect, exchangeController.getMyProducts);
router.get("/my-favorites", authController.protect, exchangeController.getMyFavorites);
router.get("/my-initiates", authController.protect, exchangeController.getMyInitiates);
router.get("/my-offers", authController.protect, exchangeController.getMyOffers);

module.exports = router;
