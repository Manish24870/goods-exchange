const express = require("express");

const upload = require("../utils/multer");

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

router.delete(
  "/:productId",
  authController.protect,
  authController.isProductOwner,
  productController.deleteAProduct
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

router.post(
  "/report/:productId",
  authController.protect,
  productController.reportAProduct
);

module.exports = router;
