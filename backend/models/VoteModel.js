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

  unvote: (postId, userId) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM vote WHERE userId = ? AND postId = ?";
      const values = [userId, postId];
      db.query(query, values, (err, result) => {
        if (err) {
          db.rollback(() => {
            reject(err);
          });
        } else {
          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                reject(err);
              });
            } else {
              resolve(result);
            }
          });
        }
      });
    });
  },
  getVoteCount: (postId) => {
    return new Promise((resolve, reject) => {
      const qry = "SELECT COUNT(*) AS voteCount FROM vote WHERE postId = ?";
      db.query(qry, [postId], (err, result) => {
        if (err) reject(err);
        else resolve(result[0].voteCount);
      });
    });
  },
};

module.exports = votemodel;
