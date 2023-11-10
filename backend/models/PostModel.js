const db = require("../config/dbConfig");

const PostModel = {
  create: (userData) => {
    const { title, description, username, userId } = userData;
    return new Promise((resolve, reject) => {
      const qry =
        "INSERT INTO posts (title, description, username, userId) VALUES (?,?,?,?)";
      db.query(qry, [title, description, username, userId], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },

  allPosts: () => {
    return new Promise((resolve, reject) => {
      const qry = "SELECT * FROM posts";
      db.query(qry, [], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },

  singlePost: (id) => {
    return new Promise((resolve, reject) => {
      const qry = "SELECT * FROM posts WHERE postId = ?";
      db.query(qry, [id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },

  updatePost: (userData, id) => {
    const { title, description } = userData;
    return new Promise((resolve, reject) => {
      const qry = "UPDATE posts SET title=?, description=? WHERE postId =?";
      db.query(qry, [title, description, id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      const qry = "DELETE FROM posts WHERE postId = ?";
      db.query(qry, [id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },

  userPost: (userId) => {
    return new Promise((resolve, reject) => {
      const qry = "SELECT * FROM posts WHERE userId =?";
      db.query(qry, [userId], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
};

module.exports = PostModel;
