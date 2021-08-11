const express = require("express");
const UserRoute = express.Router();
const {
  getAllUsers,
  getUser,
  signUp,
  loginUser,
  updateUser,
} = require("../controllers/UserController");

UserRoute.get("/", getAllUsers);
UserRoute.get("/:id", getUser);
UserRoute.post("/register", signUp);
UserRoute.post("/login", loginUser);
UserRoute.post("/:id", updateUser);

module.exports = UserRoute;
