const express = require("express");

const upload = require("../utils/multer");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post(
  "/create",
  authController.protect,
  upload.array("productImages", 10),
  productController.createNewProduct
);
router.post(
  "/:id/question",
  authController.protect,
  productController.createNewQuestion
);
router.post(
  "/:id/:questionId/answer",
  authController.protect,
  productController.createNewAnswer
);
router.post(
  "/favorite",
  authController.protect,
  productController.favoriteProduct
);

module.exports = router;
