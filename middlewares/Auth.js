const UsersModel = require("../models/UserSchema");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const jwtKey = require("../config/env").jwtKey;


const auth = async (req, res, next) => {
  const token = req.header("Authorization");
  const decoded = jwt.verify(token, jwtKey);
  
  try {
    if (decoded) {
      const user = await UsersModel.findById(decoded.id);
      if (!user) throw new createError.NotFound();
      req.user = user;
      req.token = token;
    } else {
      throw new createError.NotFound();
    }
  } catch (e) {
    next(e);
  }

  console.log("AUTH ==>", token);
  console.log("decoded ==>", decoded);

  next();
};

module.exports = auth;