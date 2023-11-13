const db = require("../config/dbConfig");

const votemodel = {
  checkVote: (userId, postId) => {
    return new Promise((resolve, reject) => {
      const qry = "SELECT * FROM vote WHERE userId = ? AND postId = ?";
      db.query(qry, [userId, postId], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },

  allVotes: (postId) => {
    return new Promise((resolve, reject) => {
      const qry = "SELECT * FROM vote WHERE postId = ?";
      db.query(qry, [postId], (err, result) => {
        if (err) return reject(err);

        return resolve(result);
      });
    });
  },

  votePost: (postId, userId, voteType) => {
    return new Promise((resolve, reject) => {
      const qry = "INSERT INTO vote(postId, userId, voteType) VALUES (?,?,?)";
      db.query(qry, [postId, userId, voteType], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },

  updateVote: (voteType, userId, postId) => {
    return new Promise((resolve, reject) => {
      const qry =
        "UPDATE vote SET voteType = ? where userId = ? AND postId = ?";
      db.query(qry, [voteType, userId, postId], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },

  removeVote: (userId, postId) => {
    return new Promise((resolve, reject) => {
      const qry = "DELETE FROM vote WHERE userId = ? AND postId = ?";
      db.query(qry, [userId, postId], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
};

module.exports = votemodel;
