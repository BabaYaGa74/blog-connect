const VoteModel = require("../models/VoteModel");

const getVotes = async (req, res) => {
  try {
    const { postId } = req.body;
    const result = await VoteModel.allVotes(postId);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("Unable to fetch all votes!!");
    console.log("Failed to fetch votes: ", error);
  }
};

const vote = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const result = await VoteModel.vote(postId, userId);
    res.status(200).send({ success: "true", result: result });
  } catch (error) {
    res.status(400).send("Unable to vote!!");
  }
};

const unVote = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const result = await VoteModel.unvote(postId, userId);
    res.status(200).send({ success: "true", unVote: result });
  } catch (error) {
    res.status(400).send("Unable to unvote!!");
  }
};

module.exports = { getVotes, vote, unVote };
