const AppError = require("../utils/AppError");

// Development error handler
const developmentErrorHandler = (err, req, res) => {
  res.status(err.statusCode || 500).json({
    status: "fail",
    error: {
      message: err.message,
      stack: err.stack,
    },
  });
};

// Validation error handler
const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError(400, `Validation failed: ${errors.join(", ")}`);
};

// Duplicate key error handler
const duplicateKeyErrorHandler = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  return new AppError(400, `Duplicate key error: ${value}`);
};

// JsonWebToken error handler
const jsonWebTokenErrorHandler = () => {
  return new AppError(401, "Invalid token. Please log in again.");
};

// Cast error handler
const castErrorHandler = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  return new AppError(
    400,
    `Invalid value: ${value}. Please provide a valid value.`
  );
};

// Production error handler
const productionErrorHandler = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Log the error for internal use
    console.error("Error:", err);

    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "dev") {
    return developmentErrorHandler(err, req, res);
  }

  if (err.name === "ValidationError") {
    err = validationErrorHandler(err);
  } else if (err.code === 11000) {
    err = duplicateKeyErrorHandler(err);
  } else if (err.name === "JsonWebTokenError") {
    err = jsonWebTokenErrorHandler(err);
  } else if (err.name === "CastError") {
    err = castErrorHandler(err);
  }

  if (process.env.NODE_ENV === "prod") {
    productionErrorHandler(err, req, res);
  }
};

module.exports = errorHandler;
