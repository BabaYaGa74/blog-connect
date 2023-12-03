const AuthModel = require("../models/authModel");
const UserDTO = require("../dto/userDTO");
const token = require("../utils/generateToken");

const registerUser = (req, res) => {
  const { name, username, email, password } = req.body;
  const userData = new UserDTO(name, username, email, password);
  AuthModel.register(userData, (err, result) => {
    if (err) {
      res.status(500).send("Error occured during register");
      return;
    } else {
      res.status(200).send({ message: "User created successfully", result });
    }
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  AuthModel.login({ email, password }, (err, results) => {
    if (err) {
      res.status(500).send("Error occured during login");
      return;
    } else {
      console.log(results);
      if (results.length == 1) {
        const id = results[0].id;
        token(id, res);
        res.status(200).send({ message: "Logged in succesfully", results });
      } else {
        res.status(401).send("Invalid Credentials");
      }
    }
  });
};

const logoutUser = (req, res) => {
  try {
    res.cookie("jwtToken", "", {
      httpOnly: true,
      maxAge: 0,
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(200).send({ message: "Logged Out Successfully!" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const reFetchUser = (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: "Internal server error!", Error: error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  reFetchUser,
  logoutUser,
};
