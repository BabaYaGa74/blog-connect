const UserModel = require("../models/userModel");
const UserDTO = require("../dto/userDTO");

//@desc Fetchs all the users
//@route GET /api/users/
//access Private
const getAllUsers = async (req, res) => {
  UserModel.getAll((err, result) => {
    if (err) {
      res.status(400).send({ message: "Error occured!" });
    } else {
      res.status(200).send({ message: "Fetched Successfully", result });
    }
  });
};

//@desc Gets a single user
//@route GET /api/users/user/:id
//access Private
const getUser = async (req, res) => {
  const { id } = req.params;
  UserModel.getUserById(id, (err, result) => {
    if (err) {
      res.status(400).send({ success: false, err });
    } else if (!result[0]) {
      res.status(400).send({ success: false, message: "No User Found" });
    } else {
      res.status(200).send({ success: true, user: result[0] });
    }
  });
};

//@desc Updates the user info
//@route PUT /api/users/user/:id
//access Private
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, email, password } = req.body;
  const userData = new UserDTO(name, username, email, password);
  UserModel.update(id, userData, (error, result) => {
    if (error)
      res
        .status(400)
        .send({ success: false, message: "Error occurred during update" });
    else {
      res.status(200).send({ success: true, result });
    }
  });
};

//@desc Deletes the user
//@route Delete /api/users/user/:id
//access Private
const deleteUser = async (req, res) => {
  const { id } = req.params;
  UserModel.delete(id, (error, result) => {
    if (error) res.status(400).send("Cannot delete due to some error");
    else {
      res.status(200).send({ success: true, result });
    }
  });
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
