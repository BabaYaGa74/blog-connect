const db = require("../config/dbConfig");

const UserModel = {
  getAll: (callback) => {
    const sql = "SELECT * FROM users";
    db.query(sql, [], callback);
  },

  getUserById: (id, callback) => {
    const qry = "SELECT * FROM users WHERE id = ?";
    db.query(qry, [id], (err, result) => {
      if (err) {
        return callback(err, []);
      } else if (result.length == 1) {
        return callback(null, result);
      } else {
        return callback(null, []);
      }
    });
  },

  update: (id, userData, callback) => {
    const { name, username, email, password } = userData;
    const qry =
      "UPDATE users SET name=?, username=?, email=?, password=? WHERE id = ?";
    db.query(qry, [name, username, email, password, id], (err, result) => {
      if (err) {
        return callback(err, []);
      } else if (result.length == 1) {
        return callback(null, result);
      } else {
        return callback(null, []);
      }
    });
  },

  delete: (id, callback) => {
    const qry = "DELETE FROM users WHERE id =?";
    db.query(qry, [id], (err, result) => {
      if (err) {
        return callback(err, []);
      } else {
        return callback(null, result);
      }
    });
  },
};

module.exports = UserModel;
