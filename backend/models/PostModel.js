const db = require("../config/dbConfig");

const PostModel = {
  create: (userData) => {
    const { title, description, username, userId, category } = userData;
    return new Promise((resolve, reject) => {
      const qry =
        "INSERT INTO posts (title, description, username, userId, category) VALUES (?,?,?,?,?)";
      db.query(
        qry,
        [title, description, username, userId, category],
        (err, result) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(result);
          }
        }
      );
    });
  },
};

module.exports = PostModel;
