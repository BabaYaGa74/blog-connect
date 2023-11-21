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
    const checkResult = await VoteModel.checkUser(postId, userId);
    let voteCount = 0;
    if (checkResult === false || checkResult !== "upvote") {
      if (checkResult === "downvote") {
        await VoteModel.deleteVote(postId, userId, "downvote");
      }
      const result = await VoteModel.vote(postId, userId);
      voteCount = await VoteModel.getVoteCount(postId);
      return res.status(200).send({ success: true, result: result, voteCount });
    } else {
      return res.status(200).send({ success: false });
    }
  } catch (error) {
    res.status(400).send("Unable to vote!!");
  }
};

const downVote = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const checkResult = await VoteModel.checkUser(postId, userId);
    let voteCount = 0;
    if (checkResult === false || checkResult !== "downvote") {
      if (checkResult === "upvote") {
        const result = await VoteModel.deleteVote(postId, userId, "upvote");
        console.log(result);
      }
      const result = await VoteModel.downvote(postId, userId);
      voteCount = await VoteModel.getVoteCount(postId);
      return res.status(200).send({ success: true, unVote: result, voteCount });
    } else {
      return res.status(200).send({ success: false });
    }
  } catch (error) {
    res.status(400).send("Unable to unvote!!");
  }
};

module.exports = { getVotes, vote, downVote };
