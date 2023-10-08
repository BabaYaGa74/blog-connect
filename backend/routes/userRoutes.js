const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/user", createUser);
router.route("/user/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
