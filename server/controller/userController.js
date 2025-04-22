const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/User");
const catchAsyncError = require("../middlewares/catchAsyncError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const allUsers = catchAsyncError(async (req, res) => {
  const user = await User.find();
  res.json({
    status: 200,
    success: true,
    msg: "All Users Successfully Fetched",
    user,
  });
});

const createUser = catchAsyncError(async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password)
    return next(new ErrorHandler("Please add all fields", 401));

  //  search for user : check user already present or not.
  let user = await User.findOne({ email });

  // checking...
  if (user) return next(new ErrorHandler("User Already Exist", 409));

  user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  });

  const SECRET_KEY = process.env.SECRET_KEY;
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "30d" });

  res.json({
    status: 201,
    success: true,
    msg: "Registered Successfully",
    user: user,
    token,
  });
});

const loginUser = catchAsyncError(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password)
    return next(new ErrorHandler("Please add all fields", 401));

  //  search for user : check user already present or not.
  let user = await User.findOne({ email });

  // checking...
  if (!user) return next(new ErrorHandler("Incorrect password or Email", 404));

  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword)
    return next(new ErrorHandler("Incorrect password or Email", 400));

  user = user.toObject();
  delete user["password"];

  const SECRET_KEY = process.env.SECRET_KEY;
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "30d" });

  res.json({
    status: 201,
    success: true,
    msg: "Successfully Login",
    user: user,
    token,
  });
});

const myProfile = catchAsyncError(async (req, res) => {
  res.json({
    status: 201,
    success: true,
    msg: "Profile Access Successfully",
    user: req.user,
  });
});

const resetPassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword) return next(new ErrorHandler("Old Password Requried", 401));
  if (!newPassword) return next(new ErrorHandler("New Password Requried", 401));

  const user = await User.findOne({ _id: req.user._id });
  const verifyPass = bcrypt.compareSync(oldPassword, user.password);

  if (!verifyPass) return next(new ErrorHandler("Old password not match", 401));

  user.password = newPassword;
  await user.save();

  res.json({
    status: 201,
    success: true,
    msg: "New Password Set",
  });
});

module.exports = {
  allUsers,
  createUser,
  loginUser,
  myProfile,
  resetPassword,
};
