const db = require("../config/dbConfig");

const votemodel = {
  vote: (postId, userId) => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO vote (postId, userId, voteType) VALUES (?, ?, ?)";
      const voteType = "upvote";
      const values = [postId, userId, voteType];
      db.query(query, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  downvote: (postId, userId) => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO vote (postId, userId, voteType) VALUES (?, ?, ?)";
      const voteType = "downvote";
      const values = [postId, userId, voteType];
      db.query(query, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  getVoteCount: (postId) => {
    return new Promise((resolve, reject) => {
      let totalVotes = 0;
      let upvotes = 0;
      let downvotes = 0;
      let queryCount = 0;

      function queryChecker() {
        if (queryCount == 2) {
          totalVotes = upvotes - downvotes;
          resolve(totalVotes);
        }
      }

      const upvoteQry =
        "SELECT COUNT(*) AS voteCount FROM vote WHERE postId = ? AND voteType = ?";
      db.query(upvoteQry, [postId, "upvote"], (err, result) => {
        if (err) reject(err);
        else {
          upvotes = result[0].voteCount;
          queryCount++;
          queryChecker();
        }
      });

      const downQry =
        "SELECT COUNT(*) AS voteCount FROM vote WHERE postId = ? AND voteType = ?";
      db.query(downQry, [postId, "downvote"], (err, result) => {
        if (err) reject(err);
        else {
          downvotes = result[0].voteCount;
          queryCount++;
          queryChecker();
        }
      });
    });
  },
};

module.exports = votemodel;
