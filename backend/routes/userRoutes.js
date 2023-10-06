const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/user", createUser);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);

module.exports = router;
