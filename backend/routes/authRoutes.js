const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  reFetchUser,
  logoutUser,
} = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/refetch", protect, reFetchUser);

module.exports = router;
