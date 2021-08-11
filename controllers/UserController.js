const UsersModel = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

exports.getAllUsers = async (req, res, next) => {
  try {
    //get all users from users collection
    let users = await UsersModel.find({}).select(
      "email userName avatar isAdmin"
    );
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  const id = req.params.id;
  //get all users from users collection
  let user = await UsersModel.findById(id).select(
    "email userName avatar isAdmin"
  );
  res.json(user);
  // console.log(user);
};

// register
exports.signUp = async (req, res, next) => {
  console.log(req.body);
  const { email, password, confirmPassword, userName } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      if (password === confirmPassword) {
        const hashPass = await bcrypt.hash(password, 10);

        new User({
          email,
          userName,
          password: hashPass,
        }).save((err, userData) => {
          if (err) console.log(err);
          const token = jwt.sign(
            {
              email,
              userName,
            },
            "jxbcdsn89890x",
            { expiresIn: 2592000000 }
          );

          res.json({ token, userId: userData._id });
          // console.log("User data  ==> ", userData);
          // console.log("User token  ==> ", token);
        });
      } else {
        console.log("Please confirm the password");
        res.json({ error: "Please confirm the password" });
      }
    } else {
      console.log(email + " already registered!");
      res.json({ error: email + " already registered!" });
    }
  } catch (e) {
    console.log(e);
  }
};

// Login
exports.loginUser = async (req, res, next) => {
  // console.log(req.body);
  const user = await UsersModel.findOne({ email: req.body.email });
  // console.log('loginuser',user);
  if (!user) {
    res.json({
      error: "NO such user found in DB. Email or password is invalid",
    });
    // next(new createError.NotFound('NO such user found in DB'))
  } else {
    // compare password and hash password
    let check = bcrypt.compareSync(req.body.password, user.password);
    // console.log('loginCheck',check);
    if (!check) {
      next(new createError.NotFound("password dose not match"));
    } else {
      const token = jwt.sign(
        {
          password: user.password,
          email: user.email,
        },
        "secretkeyFromUser",
        { expiresIn: 2555000000 }
      );

      // console.log('token', token)

      res.json({ success: true, data: user, userId: user._id, token: token });
    }
  }
};

// update
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  // console.log('id ist',id)
  // console.log(req.body);
  try {
    const user = await UsersModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({ success: true, data: user });
  } catch (e) {
    console.log(e);
  }
};
