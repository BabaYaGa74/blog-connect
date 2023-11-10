const db = require("../config/dbConfig");
const bcrypt = require("bcryptjs");
const SALT = 10;

const AuthModel = {
  register: (userdata, callback) => {
    const { name, username, email, password } = userdata;
    bcrypt.hash(password, SALT, (err, hashedPassword) => {
      if (err) {
        return callback(err);
      } else {
        const qry =
          "INSERT INTO users (name, username, email, password) VALUES (?,?,?,?)";
        db.query(qry, [name, username, email, hashedPassword], callback);
      }
    });
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

  logout: (id, callback) => {
    const sql = "SELECT * FROM users where id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = AuthModel;
