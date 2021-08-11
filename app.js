const express = require("express");
const mongoose = require("mongoose");
const core = require("./middlewares/security");
const errorsHandler = require("./middlewares/errors");
const UserRoute = require("./routes/UserRoutes");
const BlogRoute = require("./routes/BlogRoutes");
const { port, mongoURL } = require("./config/env");
const cors = require("cors");
const auth = require("./middlewares/Auth");

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
// mongoose.connection.on("error", console.error);
// mongoose.connection.on("open", () => {
//   console.log("Database connected!");
// });

const app = express();
app.use(core);
app.use(cors({ origin: "*", exposedHeaders: "auth-token" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/users", UserRoute);
app.use("/api/v1/blogs", BlogRoute);

app.use(errorsHandler);
app.listen(port, () => {
  console.log("====================================");
  console.log("Server start with port: " + port);
  console.log("====================================");
});
