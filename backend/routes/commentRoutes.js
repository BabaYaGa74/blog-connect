const express = require("express");
const router = express.Router();
const {
  createComment,
  fetchComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

router.post("/create", createComment);
router.get("/all/:id", fetchComment);
router.put("/update/:id", updateComment);
router.delete("/delete/:id", deleteComment);

module.exports = router;
