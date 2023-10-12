const AuthModel = require("../models/authModel");
const UserDTO = require("../dto/userDTO");

//@desc Registers a new User
//@route /api/auth/register
//access PUBLIC
const registerUser = async (req, res) => {
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
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  AuthModel.login({ email, password }, (err, results) => {
    if (err) {
      res.status(500).send("Error occured during login");
      return;
    } else {
      if (results.length == 1) {
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
const logoutUser = async (req, res) => {
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

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
