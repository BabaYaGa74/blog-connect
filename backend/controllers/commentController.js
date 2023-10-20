const CommentModel = require("../models/CommentModel");

const createComment = async (req, res) => {
  try {
    const { content, username, userId, postId } = req.body;
    const commentData = { content, username, userId, postId };
    const result = await CommentModel.create(commentData);
    res.status(200).send({ message: "Comment Succesfully Created!", result });
  } catch (error) {
    console.error("Comment Creation Failed", error);
    res.status(400).send("ERROR occurred during creation!", error);
  }
};

const fetchComment = async (req, res) => {
  try {
    const { postId } = req.body;
    const result = await CommentModel.getAll(postId);
    res.status(200).send({ message: "All comments: ", result });
  } catch (error) {
    console.error("ERROR While fetching", error);
    res.status(400).send("ERROR occurred while fetching comments!", error);
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const result = await CommentModel.edit(content, id);
    res.status(200).send({ message: "updated comment: ", result });
  } catch (error) {
    console.error("ERROR While updating", error);
    res.status(400).send("ERROR occurred while updating comments!", error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CommentModel.remove(id);
    res.status(200).send({ message: "deleted comment successfully! ", result });
  } catch (error) {
    console.error("ERROR While deleting comment", error);
    res.status(400).send("ERROR occurred while deleting comments!", error);
  }
};

module.exports = {
  createComment,
  fetchComment,
  updateComment,
  deleteComment,
};
