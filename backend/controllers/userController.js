const UserModel = require("../models/UserModel");

//@desc
//@route
//access
const getAllUsers = async (req, res) => {
  UserModel.getAll((err, result) => {
    if (err) {
      res.status(400).send({ message: "Error occured!" });
    } else {
      res.status(200).send({ message: "Fetched Successfully", result });
    }
  });
};

const createUser = async (req, res) => {
  const { name, username, email, password } = req.body;
  const userData = {
    name,
    username,
    email,
    password,
  };
  UserModel.create(userData, (err, result) => {
    if (err) res.status(400).send("Error occurred during creation");
    else {
      res.status(200).send({ message: "User created successfully", result });
    }
  });
};

//@desc
//@route
//access
const updateUser = async (req, res) => {
  res.send({ message: "Register Successfull" });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
};
