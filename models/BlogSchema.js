const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    require: true,
  },
  Category: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  views: {
    type: Number,
    default: 0,
  },
});

const BlogsModel = mongoose.model("blog", BlogSchema);

module.exports = BlogsModel;
