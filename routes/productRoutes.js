const express = require("express");

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/create", authController.protect, productController.createNewProduct);
router.post("/:id/question", authController.protect, productController.createNewQuestion);
router.post("/:id/:questionId/answer", authController.protect, productController.createNewAnswer);
router.get("/:id/favorite", authController.protect, productController.favoriteProduct);

module.exports = router;
