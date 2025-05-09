var crypto = require("crypto");
const httpUtils = require("../utils/httpsUtil");

// ------------------- Session -------------------
const sessions = [];

function addSessionId(username) {
  sessions.map((session, index) => {
    if (session.username === username) {
      // session.sessionId = sessionId;
      // sessions.pop(index);
      return session.sessionId;
    }
  });

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
  sessions.map((session, index) => {
    if (session.sessionId === sessionId) {
      return session.username;
    }
  });

  return null;
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
  const sessionId = req.headers["sessionId"];

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
