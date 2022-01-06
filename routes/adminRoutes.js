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

module.exports = router;
