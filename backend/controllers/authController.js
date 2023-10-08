//@desc Registers a new User
//@route /api/users/register
//access PUBLIC
const registerUser = async (req, res) => {
  res.send({ message: "Register Successful" });
};

//@desc Login to the system
//@route /api/users/login
//access PUBLIC
const loginUser = async (req, res) => {
  res.send({ message: "Login Successfull" });
};

//@desc Logout the user from the system
//@route /api/users/user/logout/:id
//access PRIVATE
const logoutUser = async (req, res) => {
  res.send({ message: "Logout Successfull" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
