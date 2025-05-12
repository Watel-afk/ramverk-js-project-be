const httpsUtil = require("../utils/httpsUtil");
const {
  validateAddBalance,
  validateCreateNewUser,
  validateChangePassword,
  getCurrentUser,
} = require("../manager/user.manager");
const { hashPassword, createSalt } = require("../manager/password.manager");
const User = require("../modules/users.model");

const addBalance = async (req, res) => {
  const balanceToAdd = req.body?.balanceToAdd;

  validateAddBalance(balanceToAdd);

  const user = await getCurrentUser(req);

  user.balance += balanceToAdd;
  await user.save();

  res.status(httpsUtil.HTTP_STATUS.OK).json({
    user: {
      username: user.username,
      balance: user.balance,
    },
  });
};

// ------------------- CREATE -------------------
const createUser = async (req, res) => {
  const password = req.body?.password;
  const confirmNewPassword = req.body?.confirmNewPassword;
  const username = req.body?.username;

  await validateCreateNewUser(username, password, confirmNewPassword);

  const salt = createSalt();

  await User.create({
    username: username,
    password: hashPassword(password, salt),
    salt: salt,
    balance: 0,
  });

  res.sendStatus(httpsUtil.HTTP_STATUS.OK);
};

// ------------------- GET Users -------------------
//TODO: För test
const getUsers = async (_, res) => {
  const users = await User.find({}, "username balance");
  res.status(httpsUtil.HTTP_STATUS.OK).json({ users });
};

// ------------------- GET current user -------------------
const getCurrentUserEndpoint = async (req, res) => {
  const user = await getCurrentUser(req);

  res.status(httpsUtil.HTTP_STATUS.OK).json({
    user: {
      username: user.username,
      balance: user.balance,
    },
  });
};

// ------------------- Password change -------------------
const changePassword = async (req, res) => {
  const oldPassword = req.body?.oldPassword;
  const newPassword = req.body?.newPassword;
  const confirmedNewPassword = req.body?.confirmNewPassword;
  const user = await getCurrentUser(req);

  await validateChangePassword(
    user,
    oldPassword,
    newPassword,
    confirmedNewPassword
  );

  await user.updateOne({
    password: hashPassword(newPassword, user.salt),
  });

  res.sendStatus(httpsUtil.HTTP_STATUS.OK);
};

module.exports = {
  addBalance,
  createUser,
  getUsers,
  getCurrentUserEndpoint,
  changePassword,
};
