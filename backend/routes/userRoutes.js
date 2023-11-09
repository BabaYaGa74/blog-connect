const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

router.get("/", getAllUsers);
router.route("/user/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
