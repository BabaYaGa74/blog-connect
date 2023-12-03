const db = require("../config/dbConfig");

const CommentModel = {
  create: (commentData) => {
    return new Promise((resolve, reject) => {
      const { content, username, userId, postId } = commentData;
      const qry =
        "INSERT INTO comments(content, username, userId, postId) VALUES (?,?,?,?)";
      db.query(qry, [content, username, userId, postId], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
  getAll: (id) => {
    return new Promise((resolve, reject) => {
      const qry = "SELECT * FROM comments WHERE postId = ?";
      db.query(qry, [id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
  edit: (commentCon, id) => {
    return new Promise((resolve, reject) => {
      const qry = "UPDATE comments SET content =? WHERE commentId=?";
      db.query(qry, [commentCon, id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      const qry = "DELETE FROM comments WHERE commentId=?";
      db.query(qry, [id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
};

module.exports = CommentModel;
