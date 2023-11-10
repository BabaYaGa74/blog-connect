const db = require("../config/dbConfig");
const bcrypt = require("bcryptjs");
const SALT = 10;

const UserModel = {
  getAll: (callback) => {
    const sql = "SELECT * FROM users";
    db.query(sql, [], callback);
  },

  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      const qry = "SELECT * FROM users WHERE id = ?";
      db.query(qry, [id], (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.length === 1) {
          resolve(result[0]);
        } else {
          resolve([]);
        }
      });
    });
  },

  update: (id, userData) => {
    return new Promise((resolve, reject) => {
      const { name, username, email, password } = userData;
      bcrypt.hash(password, SALT, (err, hashedPassword) => {
        if (err) {
          return callback(err);
        } else {
          const qry =
            "UPDATE users SET name=?, username=?, email=?, password=? WHERE id = ?";
          db.query(
            qry,
            [name, username, email, hashedPassword, id],
            (err, result) => {
              if (err) {
                reject(err);
              } else if (result.length == 1) {
                resolve(result);
              } else {
                resolve([]);
              }
            }
          );
        }
      });
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
