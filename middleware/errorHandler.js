const constants = require("../config/constants");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: constants.ERRORS.INTERNAL_SERVER_ERROR,
    error: err.message,
  });
};

module.exports = errorHandler;
