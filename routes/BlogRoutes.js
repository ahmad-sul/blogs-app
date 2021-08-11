const express = require("express");
const BlogRoute = express.Router();
const { auth } = require("../middlewares/Auth");
const {
  getBlogs,
  getSingleBlog,
  postBlog,
  userBlogs,
  deleteUserBlog,
  editBlog,
  deleteBlog,
} = require("../controllers/BlogController");

BlogRoute.get("/", getBlogs);
BlogRoute.post("/", postBlog);
BlogRoute.get("/singleBlog/:id", getSingleBlog);
BlogRoute.get("/getUserBlog/:id", userBlogs);
BlogRoute.delete("/deleteBlog/:id", deleteUserBlog);
BlogRoute.post("/editBlog/:id", editBlog);
BlogRoute.delete("/deleteBlogs/:id", deleteBlog);

module.exports = BlogRoute;
