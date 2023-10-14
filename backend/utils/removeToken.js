const removeToken = (res) => {
  try {
    res.cookie("jwtToken", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "strict",
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = removeToken;
