const PostModel = require("../models/PostModel");

const createPost = async (req, res) => {
  try {
    const { title, description, username, userId, category } = req.body;
    const userData = {
      title,
      description,
      username,
      userId,
      category,
    };
    const result = await PostModel.create(userData);
    res.status(201).send({ message: "Post created successfully!", result });
  } catch (error) {
    console.error("Error occured during creation", error);
    res.status(400).send("Error occured, Cannot create user");
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.allPosts();
    console.log(posts);
    res.status(200).send({ message: "Posts found!", posts });
  } catch (error) {
    console.error("Cannot fetch posts", error);
    res.status(400).send("Error occured while fetching posts");
  }
};

const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.singlePost(id);
    console.log(post);
    res.status(200).send({ message: "Post found!", post: post[0] });
  } catch (error) {
    console.error("Cannot fetch the post", error);
    res.status(400).send("Error occured while fetching post");
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const { id } = req.params;
    const updatedPost = await PostModel.updatePost(
      { title, description, category },
      id
    );
    res
      .status(200)
      .send({ message: "Post updated Successfully!", updatedPost });
  } catch (error) {
    console.error("Cannot update the post", error);
    res.status(400).send("Error! Cannot Update");
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await PostModel.delete(id);
    console.log(deletedPost);
    res.status(200).send({ Message: "Post Deleted Successfully", deletedPost });
  } catch (error) {
    console.error("Cannot delete the post", error);
    res.status(400).send("Error! Cannot delete post");
  }
};

const getUserPost = async (req, res) => {
  try {
    const { id } = req.params;
    const userPosts = await PostModel.userPost(id);
    console.log(userPosts);
    res
      .status(200)
      .send({ message: "User's post fetched successfully!", userPosts });
  } catch (error) {
    console.error("Cannot fetch post", error);
    res.status(400).send("Error occured while fetching user's post");
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  getUserPost,
};
