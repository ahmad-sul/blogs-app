const mongoose = require("mongoose");
const Blog = require("../models/BlogSchema");
mongoURL;

mongoose.connect(
  mongoURL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log("connected to blogs-app DB")
);

async function seedBlogData() {
  try {
    await Blog.deleteMany({});

    const blogs = Array()
      .fill(null)
      .map(() => {
        const blog = new Blog({
          title: faker.name.title(),
          img: faker.image.image(),
          content: faker.lorem.text(),
          date: faker.date.recent(),
        });
        return blog.save();
      });

    // console.log(users)
    await Promise.all(blogs);
  } catch (err) {
    console.log(err.message);
  }
  mongoose.connection.close();
}

seedBlogData();
