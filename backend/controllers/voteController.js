const VoteModel = require("../models/VoteModel");

const getVotes = async (req, res) => {
  try {
    const { postId } = req.body;
    const voteCount = await VoteModel.getVoteCount(postId);
    res.status(200).send({ voteCount: voteCount });
  } catch (error) {
    res.status(400).send("Unable to fetch all votes!!");
    console.log("Failed to fetch votes: ", error);
  }
};

const vote = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const result = await VoteModel.vote(postId, userId);
    const voteCount = await VoteModel.getVoteCount(postId);
    console.log("Votes:", voteCount);
    res.status(200).send({ success: "true", result: result, voteCount });
  } catch (error) {
    res.status(400).send("Unable to vote!!");
  }
};

const downVote = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const result = await VoteModel.downvote(postId, userId);
    const voteCount = await VoteModel.getVoteCount(postId);
    res.status(200).send({ success: "true", unVote: result, voteCount });
  } catch (error) {
    res.status(400).send("Unable to unvote!!");
  }
};

module.exports = { getVotes, vote, downVote };
