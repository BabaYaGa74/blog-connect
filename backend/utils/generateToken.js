const jwt = require("jsonwebtoken");

const generateToken = (id, res) => {
  try {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);

    res.cookie("jwtToken", token, {
      httpOnly: true,
      sameSite: "strict",
    });
  } catch (error) {
    console.error("Error occured during creation: ", error);
    res.status(500).send("ERROR while creating token");
  }
};

module.exports = generateToken;
