const db = require("../config/dbConfig");
const bcrypt = require("bcryptjs");
const SALT = 10;

const AuthModel = {
  register: async (userdata, callback) => {
    try {
      const { name, username, email, password } = userdata;
      const hashedPassword = await bcrypt.hash(password, SALT);
      const qry =
        "INSERT INTO users (name, username, email, password) VALUES (?,?,?,?)";
      db.query(qry, [name, username, email, hashedPassword], callback);
    } catch (error) {
      callback(error);
    }
  },

  login: (userdata, callback) => {
    const { email, password } = userdata;
    const sqlQuery = "SELECT id, email, password FROM users where email = ?";
    db.query(sqlQuery, [email], async (err, results) => {
      if (err) {
        return callback(err);
      }
      if (results.length !== 1) {
        return callback(null, []);
      }

      const user = results[0];

      const isMatched = await bcrypt.compare(password, user.password);
      if (isMatched) {
        delete user.password;
        return callback(null, [user]);
      } else {
        return callback(null, []);
      }
    });
  },
};

module.exports = AuthModel;
