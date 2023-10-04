const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const port = process.env.PORT || 8080;

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
