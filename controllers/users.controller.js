var crypto = require("crypto");
const User = require("../modules/users.model");
const httpsUtil = require("../utils/httpsUtil");

// ------------------- Constants -------------------
const MAX_LENGTH_USERNAME = 50;
const MIN_LENGTH_PASSWORD = 8;
const MAX_LENGTH_PASSWORD = 128;

// ------------------- CREATE -------------------
const createUser = async (req, res) => {
  const password = req.body?.password;
  const username = req.body?.username;

  if (!username || !password) {
    return res
      .status(httpsUtil.HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Username or password not provided" });
  }

  if (username.length > MAX_LENGTH_USERNAME) {
    return res.status(httpsUtil.HTTP_STATUS.BAD_REQUEST).json({
      message: "Username too long, max length is",
      MAX_LENGTH_USERNAME,
    });
  }

  if (password.length > MAX_LENGTH_PASSWORD) {
    return res.status(httpsUtil.HTTP_STATUS.BAD_REQUEST).json({
      message: "Password to long, max length is " + MAX_LENGTH_PASSWORD,
    });
  }

  if (password.length < MIN_LENGTH_PASSWORD) {
    return res.status(httpsUtil.HTTP_STATUS.BAD_REQUEST).json({
      message: "Password too short, min length is " + MIN_LENGTH_PASSWORD,
    });
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  const user = await User.create({
    username: username,
    password: hash,
    salt: salt,
    balance: 0,
  });

  res
    .status(httpsUtil.HTTP_STATUS.OK)
    .json({ username: user.username, balance: user.balance });
};

// ------------------- GET -------------------
const getUsers = async (_, res) => {
  try {
    const users = await User.find({}, "username", "balance");
    res.status(httpsUtil.HTTP_STATUS.OK).json({ users });
  } catch (error) {
    res.status(httpsUtil.HTTP_STATUS.ERROR).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = getUserById(id);

    res
      .status(httpsUtil.HTTP_STATUS.OK)
      .json({ username: user.username, coins: user.coins });
  } catch (error) {
    const status = error.httpStatus || httpsUtil.HTTP_STATUS.ERROR;
    const message = error.message || "An unexpected error occurred";

    res.status(status).json({ message: error.message });
  }
};

// ------------------- Password change -------------------
const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const password = req.body?.password;

    const user = await getUserById(id);

    // User.findByIdAndUpdate();

    res.status(httpsUtil.HTTP_STATUS.OK).json(await User.findById(id));
  } catch (error) {
    res.status(httpsUtil.HTTP_STATUS.ERROR).json({ message: error.message });
  }
};

// ------------------- Utils -------------------

const getUserById = async (id) => {
  if (!id) {
    throw {
      httpStatus: httpsUtil.HTTP_STATUS.NOT_FOUND,
      message: "UserId not provided",
    };
  }

  const user = await User.findById(id);

  if (!user) {
    throw {
      httpStatus: httpsUtil.HTTP_STATUS.NOT_FOUND,
      message: "User not found",
    };
  }

  return user;
};

module.exports = { createUser, getUsers, getUser, changePassword };
