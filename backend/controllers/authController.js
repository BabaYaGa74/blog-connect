const AuthModel = require("../models/authModel");
const UserDTO = require("../dto/userDTO");
const token = require("../utils/generateToken");

//@desc Registers a new User
//@route /api/auth/register
//access PUBLIC
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

//@desc Login to the system
//@route /api/auth/login
//access PUBLIC
const loginUser = (req, res) => {
  const { email, password } = req.body;
  AuthModel.login({ email, password }, (err, results) => {
    if (err) {
      res.status(500).send("Error occured during login");
      return;
    } else {
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

//@desc Logout the user from the system
//@route /api/auth/logout/:id
//access PRIVATE
const logoutUser = (req, res) => {
  const { id } = req.params;
  AuthModel.logout(id, (err, results) => {
    if (err) {
      res.status(400).send("Error while loggin out");
      return;
    } else {
      res.status(200).send("Logout Successful");
    }
  });
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
  logoutUser,
  reFetchUser,
};
