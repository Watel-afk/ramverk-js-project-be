var crypto = require("crypto");
const { throwHTTPError } = require("./error.manager.js");
const { getUserByName } = require("../factory/user.factory");
const httpsUtil = require("../utils/httpsUtil");

// ------------------- Constants -------------------
const MIN_LENGTH_PASSWORD = 8;
const MAX_LENGTH_PASSWORD = 128;

// ------------------- Log in -------------------

const validateLogin = async (username, password) => {
  validatePasswordIsInitialized(password);
  validateUsernameIsInitialized(username);

  user = await getUserByName(username);

  validateUserExist(user);
  validateIsCorrectUserPassword(user, password);
};

// ------------------- Validate password is correct -------------------
const isCorrectPassword = (user, password) => {
  if (!user || !password) {
    return false;
  }

  const hashedPassword = hashPassword(password, user.salt);
  return hashedPassword === user.password;
};

const createSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

const hashPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
};

// ------------------- Validations -------------------
const validatePasswordIsInitialized = (password) => {
  validateGeneralPasswordIsInitialized(password, "Password is not provided");
};

const validateNewPasswordIsInitialized = (password) => {
  validateGeneralPasswordIsInitialized(
    password,
    "new password is not provided"
  );
};

const validateConfirmedPasswordIsInitialized = (password) => {
  validateGeneralPasswordIsInitialized(
    password,
    "Confirmed password is not provided"
  );
};

const validateGeneralPasswordIsInitialized = (password, errorMessage) => {
  if (!password) {
    throwHTTPError(httpsUtil.HTTP_STATUS.BAD_REQUEST, errorMessage);
  }
};

const validateNewAndConfirmedPasswordAreEqual = (
  newPassword,
  confirmedPassword
) => {
  if (newPassword !== confirmedPassword) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "Password and confirmed password are not equal"
    );
  }
};

const validatePasswordLength = (password) => {
  if (password.length > MAX_LENGTH_PASSWORD) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "Password to long, max length is " + MAX_LENGTH_PASSWORD
    );
  }

  if (password.length < MIN_LENGTH_PASSWORD) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "Password too short, min length is " + MIN_LENGTH_PASSWORD
    );
  }
};

const validateIsCorrectUserPassword = (user, password) => {
  const passwordCorrect = isCorrectPassword(user, password);

  if (!passwordCorrect) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "Password is not correct"
    );
  }
};

const validateUsernameIsInitialized = (username) => {
  if (!username) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "Username is not provided"
    );
  }
};

const validateUserExist = (user) => {
  if (!user) {
    throwHTTPError(httpsUtil.HTTP_STATUS.BAD_REQUEST, "User does not exist");
  }
};

module.exports = {
  isCorrectPassword,
  validatePasswordIsInitialized,
  validatePasswordLength,
  validateNewPasswordIsInitialized,
  validateConfirmedPasswordIsInitialized,
  validateNewAndConfirmedPasswordAreEqual,
  validateIsCorrectUserPassword,
  hashPassword,
  createSalt,
  validateLogin,
};
