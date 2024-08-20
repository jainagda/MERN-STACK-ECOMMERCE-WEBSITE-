const ErrorHandler = require("../utils/errorHandle");
const errorHandler = require("../utils/errorHandle");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // worng mongoDb id error
  console.log("message", err);
  if (err.name === "CastError") {
    const message = `Resource not found. invalid:${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //mongoose duplicate key error

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === "TokenExpiredError") {
    const message = " Json Web Token is Invalid, try again";
    err = new ErrorHandler(message, 400);
  }
  // jwt expire error 
  if (err.code === "") {
    const message = " Json Web Token is Expired, try again";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
