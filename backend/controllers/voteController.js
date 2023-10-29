const VoteModel = require("../models/VoteModel");

const getVotes = (req, res) => {
  console.log("get votes");
  VoteModel.vote;
};

const vote = (req, res) => {
  console.log("Post vote");
};

const unVote = (req, res) => {
  console.log("Unvote");
};

module.exports = { getVotes, vote, unVote };
