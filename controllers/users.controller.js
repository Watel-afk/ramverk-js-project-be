const httpsUtil = require("../utils/httpsUtil");
const {
  validateCreateNewUser,
  validateChangePassword,
  getCurrentUser,
} = require("../manager/user.manager");
const { hashPassword, createSalt } = require("../manager/password.manager");
const User = require("../modules/users.model");

// ------------------- CREATE -------------------
const createUser = async (req, res) => {
  const password = req.body?.password;
  const username = req.body?.username;

  console.log("1");

  await validateCreateNewUser(username, password);

  const salt = createSalt();

  await User.create({
    username: username,
    password: hashPassword(password, salt),
    salt: salt,
    balance: 0,
  });

  res.sendStatus(httpsUtil.HTTP_STATUS.OK);
};

// ------------------- GET User -------------------

//TODO: För test
const getUsers = async (_, res) => {
  const users = await User.find({}, "username", "balance");
  res.status(httpsUtil.HTTP_STATUS.OK).json({ users });
};

const getCurrentUserEndpoint = async (req, res) => {
  const user = await getCurrentUser();

  res.status(httpsUtil.HTTP_STATUS.OK).json({
    username: user.username,
    balance: user.balance,
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

  res.status(httpsUtil.HTTP_STATUS.OK);
};

module.exports = {
  createUser,
  getUsers,
  getCurrentUserEndpoint,
  changePassword,
};
