const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/user", createUser);
router.put("/user/:id", updateUser);

module.exports = router;
