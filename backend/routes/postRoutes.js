const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  getUserPost,
} = require("../controllers/postController");

router.post("/create", createPost);
router.get("/all", getAllPosts);
router.get("/post/:id", getSinglePost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);
router.get("/post/user/:id", getUserPost);

module.exports = router;
