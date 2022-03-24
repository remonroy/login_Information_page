const ErrorHandler = require("../util/errorHandler");
// const multer = require("multer");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong Mongodb id Error
  if (err.name === "CastError") {
    const message = `Resource Not Found: Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  //Mongodb Duplicate id
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `json webToken is invalid . Try again`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "jsonExpiredError") {
    const message = `json webToken is Expired . Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
