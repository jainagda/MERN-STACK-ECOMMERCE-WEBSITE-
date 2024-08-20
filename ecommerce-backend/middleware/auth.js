const ErrorHandler = require("../utils/errorHandle");
const catchAsyncErrors = require("./catchAsyncErrors");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login To acceess this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await userModel.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not alllowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
