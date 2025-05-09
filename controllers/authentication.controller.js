const User = require("../modules/users.model");
const {
  addSessionId,
  removeSession,
} = require("../manager/authorization.manager");

const httpUtils = require("../utils/httpsUtil");
const { validateLogin } = require("../manager/password.manager");

// ------------------- Login -------------------
const login = async (req, res) => {
  const username = req.body?.username;
  const password = req.body?.password;

  await validateLogin(username, password);

  const sessionId = addSessionId(username);
  res
    .status(httpUtils.HTTP_STATUS.OK)
    .json({ username: username, session: sessionId });
};

const logout = async (req, res) => {
  const sessionId = req.headers["sessionId"];
  removeSession(sessionId);

  res.status(httpUtils.HTTP_STATUS.OK);
};

module.exports = { login, logout };
