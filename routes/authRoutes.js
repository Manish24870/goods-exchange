const express = require("express");

const upload = require("../utils/multer");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/get-user/:userId", authController.protect, authController.getUser);
router.post(
  "/update-profile",
  authController.protect,
  upload.single("userImage"),
  authController.updateUserProfile
);

module.exports = router;
