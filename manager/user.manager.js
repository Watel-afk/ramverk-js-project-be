const {
  validatePasswordIsInitialized,
  validateNewPasswordIsInitialized,
  validateConfirmedPasswordIsInitialized,
  validatePasswordLength,
  validateNewAndConfirmedPasswordAreEqual,
  validateIsCorrectUserPassword,
} = require("./password.manager");
const httpsUtil = require("../utils/httpsUtil");
const { getUserByName } = require("../factory/user.factory");
const { throwHTTPError } = require("./error.manager.js");
const { getUsername } = require("./authorization.manager.js");

// ------------------- Constants -------------------
const MAX_LENGTH_USERNAME = 50;

// ------------------- Current user -------------------
const getCurrentUser = async (req) => {
  const sessionId = req.headers["sessionId"];

  const username = getUsername(sessionId);
  const user = await getUserByName(username);

  if (!user) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.UNAUTHORIZED,
      "Unexpected error, User not found with this sessionId"
    );
  }

  return user;
};

// ------------------- Validate create new user -------------------
const validateCreateNewUser = async (username, newPassword) => {
  console.log("1");
  validatePasswordIsInitialized(newPassword);
  console.log("2");
  validateUsernameIsInitialized(username);
  console.log("3");
  validateUsernameLength(username);
  console.log("4");
  validatePasswordLength(newPassword);

  await validateUserDoesNotAlreadyExist(username);
};

// ------------------- Validate create new user -------------------
const validateChangePassword = async (
  user,
  oldPassword,
  newPassword,
  confirmedNewPassword
) => {
  validatePasswordIsInitialized(oldPassword);
  validateNewPasswordIsInitialized(newPassword);
  validateConfirmedPasswordIsInitialized(confirmedNewPassword);

  validateNewAndConfirmedPasswordAreEqual(newPassword, confirmedNewPassword);
  validatePasswordLength(newPassword);
  validateIsCorrectUserPassword(user, oldPassword);
};

// ------------------- Validations -------------------
const validateUsernameIsInitialized = (username) => {
  if (!username) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "Username is not provided"
    );
  }
};

const validateUsernameLength = (username) => {
  if (username.length > MAX_LENGTH_USERNAME) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "Username too long, max length is" + MAX_LENGTH_USERNAME
    );
  }
};

const validateUserDoesNotAlreadyExist = async (username) => {
  console.log("aaaaaaaaaaaaaaaaa");

  const user = await getUserByName(username);

  console.log("bbbbbbbbbbbbb");

  if (user) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "User already exists with this username"
    );
  }
};

module.exports = {
  validateCreateNewUser,
  getCurrentUser,
  validateChangePassword,
};
