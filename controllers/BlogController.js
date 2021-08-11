const BlogsModel = require("../models/BlogSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
// const conection = require('../mongooseConnection')

exports.getBlogs = async (req, res, next) => {
  try {
    //get all users from users collection
    let blogs = await BlogsModel.find({}).populate("userId");
    res.json({ success: true, data: blogs });
  } catch (err) {
    next(err);
  }
};

exports.getSingleBlog = async (req, res, next) => {
  const id = req.params.id;
  //get all users from users collection
  let blog = await BlogsModel.findById(id);

  blog.views = blog.views + 1;

  await blog.save();
  res.json(blog);
  console.log(blog);
};

// register
exports.postBlog = async (req, res, next) => {
  try {
    const blog = new BlogsModel(req.body);
    console.log(blog);
    await blog.save();
    //    res.end()
    res.send({ success: true, data: blog });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

exports.userBlogs = async (req, res, next) => {
  const { id } = req.params;
  // console.log({id});
  try {
    const blogs = await BlogsModel.find({ userId: id });
    res.json(blogs);
    // console.log(blogs);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

exports.deleteUserBlog = async (req, res, next) => {
  const { id } = req.params;
  // console.log({id});
  try {
    const blog = await BlogsModel.findOneAndRemove({ userId: id });
    res.send({ success: true, data: blog });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

exports.editBlog = async (req, res, next) => {
  const { id } = req.params;
  console.log("boddddddy", req.body);
  try {
    const blog = await BlogsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    //    res.end()
    res.send({ success: true, data: blog });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  // console.log('delete blogs',{id});
  try {
    const blog = await BlogsModel.findOneAndRemove({ _id: id });
    res.send({ success: true, data: blog });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
