const VoteModel = require("../models/VoteModel");

const getVotes = async (req, res) => {
  try {
    const { postId, voteType } = req.body;
    const result = await VoteModel.allVotes(postId, voteType);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send("Unable to fetch all votes!!");
    console.log("Failed to fetch votes: ", error);
  }
};

const vote = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const result = await VoteModel.checkVote(userId, postId);
    let voteType, vote;
    if (result.length === 0) {
      voteType = "upvote";
      vote = await VoteModel.votePost(postId, userId, voteType);
      res.status(200).send({ success: "true", result: vote });
    } else if (result.length === 1 && result[0].voteType == "upvote") {
      voteType = "downvote";
      vote = await VoteModel.updateVote(voteType, userId, postId);
      res.status(200).send({ success: "true", result: vote });
    } else if (result.length === 1 && result[0].voteType == "downvote") {
      const voteType = "upvote";
      vote = await VoteModel.updateVote(voteType, userId, postId);
      res.status(200).send({ success: "true", result: vote });
    } else {
      res
        .status(500)
        .send({ success: "false", ERROR: "Registered more than once!" });
    }
  } catch (error) {
    res.status(400).send("Unable to vote!!");
    console.log("Failed to vote: ", error);
  }
};

const unVote = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const result = await VoteModel.removeVote(userId, postId);
    res.status(200).send({ success: "true", vote: result });
  } catch (error) {
    res.status(400).send("Unable to unvote!!");
    console.log("Failed to unvote: ", error);
  }
};

module.exports = { getVotes, vote, unVote };
