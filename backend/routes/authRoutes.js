const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  selectRole
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// REGISTER

router.post(
  "/register",
  registerUser
);

// LOGIN

router.post(
  "/login",
  loginUser
);

router.put(
  "/forgot-password",
  forgotPassword
);

// SELECT ROLE

router.post(
  "/select-role",
  authMiddleware,
  selectRole
);

module.exports = router;