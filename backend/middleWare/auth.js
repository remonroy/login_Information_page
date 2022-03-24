const ErrorHandler = require("../util/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticationUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login Access this Resource", 401));
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);

  req.user = await User.findById(decodedToken.id);
  next();
});

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} is not allowed this resource.`, 401)
      );
    }
    next();
  };
};
