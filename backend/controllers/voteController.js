const getVotes = (req, res) => {
  console.log("get votes");
};

const vote = (req, res) => {
  console.log("Post vote");
};

const unVote = (req, res) => {
  console.log("Unvote");
};

module.exports = { getVotes, vote, unVote };
