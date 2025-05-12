var crypto = require("crypto");
const httpUtils = require("../utils/httpsUtil");

// ------------------- Session -------------------
const sessions = [];

function addSessionId(username) {
  const foundSessionId = sessions.find(
    (session) => session.username === username
  );

  if (foundSessionId) {
    return foundSessionId.sessionId;
  }

  const sessionId = crypto.randomBytes(16).toString("base64");
  sessions.push({ username: username, sessionId: sessionId });

  return sessionId;
}

function getSession() {
  return sessions;
}

function userHasValidSession(username) {
  return sessions.some((session) => session.username === username);
}

function getUsername(sessionId) {
  const foundSessionId = sessions.find(
    (session) => session.sessionId === sessionId
  );

  return foundSessionId ? foundSessionId.username : null;
}

function removeSession(sessionId) {
  sessions.map((session, index) => {
    if (session.sessionId === sessionId) {
      sessions.pop(index);
    }
  });
}

function sessionExist(sessionId) {
  return sessions.some((session) => session.sessionId === sessionId);
}

const authorizeSession = (req, res, next) => {
  const sessionId = req.headers?.sessionid;

  if (!sessionId || !sessionExist(sessionId)) {
    return res
      .status(httpUtils.HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  next();
};

module.exports = {
  authorizeSession,
  addSessionId,
  removeSession,
  userHasValidSession,
  getSession,
  getUsername,
};
