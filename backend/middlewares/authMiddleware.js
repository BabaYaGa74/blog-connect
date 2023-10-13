const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

export const protect = async (req, res, next) => {
  let token = req.cookies.jwtToken;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.getUserById(decoded.userId).select(
        "-password"
      );
      next();
    } catch (error) {
      console.error("Error during token verification: ", error);
      res.status(500).send("No authorization, Invalid token");
    }
  } else {
    res.status(500).send("No authorization, No token");
  }
};
