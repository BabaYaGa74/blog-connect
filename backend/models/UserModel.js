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
      const { name, username, password } = userData;
      const values = [name, username, password];
      if (password) {
        bcrypt.hash(password, SALT, (err, hashedPassword) => {
          if (err) {
            reject(err);
          } else {
            values.push(hashedPassword);
            values.push(id);
            performUpdate(values, resolve, reject);
          }
        });
      } else {
        values.push(id);
        performUpdate(values, resolve, reject);
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

const performUpdate = (values, resolve, reject) => {
  const qry = "UPDATE users SET name=?, username=?, password =? WHERE id = ?";
  db.query(qry, values, (err, result) => {
    if (err) {
      reject(err);
    } else if (result.length == 1) {
      resolve(result);
    } else {
      resolve([]);
    }
  });
};

module.exports = UserModel;
