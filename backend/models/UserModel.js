const db = require("../config/dbConfig");

const UserModel = {
  getAll: (callback) => {
    const sql = "SELECT * FROM users";
    db.query(sql, [], callback);
  },

  create: (userdata, callback) => {
    const { name, username, email, password } = userdata;
    const qry =
      "INSERT INTO users (name, username, email, password) VALUES (?,?,?,?)";
    db.query(qry, [name, username, email, password], callback);
  },

  getUserById: (id, callback) => {
    const qry = "SELECT * FROM users WHERE id = ?";
    db.query(qry, [id], callback);
  },
};

module.exports = UserModel;
