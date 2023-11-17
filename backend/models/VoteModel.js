const db = require("../config/dbConfig");

const votemodel = {
  vote: (postId, userId) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO vote (postId, userId) VALUES (?, ?)";
      const values = [postId, userId];
      db.query(query, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  unvote: async (postId, userId) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM votes WHERE postId = ? AND userId = ?";
      const values = [postId, userId];
      db.query(query, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
};

module.exports = votemodel;
