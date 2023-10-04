const express = require("express");
const router = express.Router();
const { getUser, updateUser } = require("../controllers/userController");

router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);

module.exports = router;
