const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const protect = async (req, res, next) => {
  let token = req.cookies.jwtToken;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userInfo = await UserModel.getUserById(decoded.userId);
      const User = {
        userId: userInfo.id,
        name: userInfo.name,
        username: userInfo.username,
        email: userInfo.email,
      };
      req.user = User;
      next();
    } catch (error) {
      console.error("Error during token verification: ", error);
      res.status(500).send("No authorization, Invalid token");
    }
  } else {
    res.status(500).send("No authorization, No token");
  }
};

module.exports = protect;
