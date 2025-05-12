const throwHTTPError = (statusCode, message) => {
  throw {
    httpStatus: statusCode,
    message: message,
  };
};

const handleError = (res, error) => {
  if (error.httpStatus) {
    res.status(error.httpStatus).json({ message: error.message });
  } else {
    res.status(500).json({ message: error });
  }
};

module.exports = { throwHTTPError, handleError };
