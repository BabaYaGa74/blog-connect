//@desc
//@route
//access
const registerUser = async (req, res) => {
  res.send({ message: "Register Successfull" });
};

//@desc
//@route
//access
const loginUser = async (req, res) => {
  res.send({ message: "Login Successfull" });
};

//@desc
//@route
//access
const logoutUser = async (req, res) => {
  res.send({ message: "Logout Successfull" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
