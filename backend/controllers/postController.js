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

module.exports = {
  createPost,
};
