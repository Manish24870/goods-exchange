const express = require("express");

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/create", authController.protect, productController.createNewProduct);
router.post("/:id/question", authController.protect, productController.createNewQuestion);

module.exports = router;
