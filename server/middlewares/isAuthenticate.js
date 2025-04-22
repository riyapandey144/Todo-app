const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");

const isAuth = catchAsyncError(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "Invalid Token Format",
    });
  }
  const SECRET_KEY = process.env.SECRET_KEY;
  const decode = jwt.verify(token, SECRET_KEY);

  if (!decode) return next(new ErrorHandler("Login first", 401));

  const user = await User.findOne({ _id: decode.id }).select("-password");

  if (!user) return next(new ErrorHandler("User Not Found", 404));

  req.user = user;
  next();
});

module.exports = isAuth;
