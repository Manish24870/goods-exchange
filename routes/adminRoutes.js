const express = require("express");

const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get(
  "/get-users",
  authController.protect,
  authController.restrict("admin"),
  adminController.getAllUsers
);

router.delete(
  "/delete-user/:userId",
  authController.protect,
  authController.restrict("admin"),
  adminController.deleteAUser
);

router.patch(
  "/promote-user",
  authController.protect,
  authController.restrict("admin"),
  adminController.promoteAUser
);

router.patch(
  "/demote-user",
  authController.protect,
  authController.restrict("admin"),
  adminController.demoteAUser
);

router.get(
  "/get-products",
  authController.protect,
  authController.restrict("admin"),
  adminController.getAllProducts
);

router.delete(
  "/delete-product/:productId",
  authController.protect,
  authController.restrict("admin"),
  adminController.deleteAProduct
);

module.exports = router;
