const jwt = require("jsonwebtoken");

const jwtSecret = "jsonwebTokenKey";
const generateToken = (id) => {
  jwt.sign({ id }, jwtSecret, {}, (err, result) => {
    if (err) throw new Error("Error while creating token");

    console.log(result);
  });
};

module.exports = generateToken;
