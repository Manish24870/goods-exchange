const express = require("express");

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", productController.getProducts);
router.post("/create", authController.protect, productController.createNewProduct);

module.exports = router;
