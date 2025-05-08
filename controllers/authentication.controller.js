const User = require("../modules/users.model");
const {
  addSessionId,
  removeSession,
  useHasValidSession,
} = require("../manager/authorization.manager");

const httpUtils = require("../utils/httpsUtil");
const { isValidPassword } = require("../manager/password.manager");

// ------------------- Login -------------------
const login = async (req, res) => {
  const username = req.body?.username;
  const password = req.body?.password;

  if (!username || !password) {
    return res
      .status(httpUtils.HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Username or password not provided" });
  }

  const user = await User.findOne({ username: username });

  if (!user) {
    return res
      .status(httpUtils.HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "User not found" });
  }

  console.log("user", username);
  console.log("password", password);
  console.log("user.salt", user.salt);

  if (!isValidPassword(user, password)) {
    return res
      .status(httpUtils.HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "Invalid password" });
  }

  if (useHasValidSession(username)) {
    return res
      .status(httpUtils.HTTP_STATUS.BAD_REQUEST)
      .json({ message: "User is already logged in" });
  }

  const sessionId = addSessionId(username);
  res
    .status(httpUtils.HTTP_STATUS.OK)
    .json({ username: user.username, session: sessionId });
};

const logout = async (req, res) => {
  const sessionId = req.headers["sessionId"];
  removeSession(sessionId);

  res.status(httpUtils.HTTP_STATUS.OK);
};

module.exports = { login, logout };
