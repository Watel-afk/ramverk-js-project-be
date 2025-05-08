var crypto = require("crypto");
const httpUtils = require("../utils/httpsUtil");

// ------------------- Session -------------------
const sessions = [];

function addSessionId(username) {
  const sessionId = crypto.randomBytes(16).toString("base64");

  sessions.map((session, index) => {
    if (session.username === username) {
      session.sessionId = sessionId;
      sessions.pop(index);
    }
  });

  sessions.push({ username: username, sessionId: sessionId });

  return sessionId;
}

function getSession() {
  return sessions;
}

function useHasValidSession(username) {
  return sessions.some((session) => session.username === username);
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
  useHasValidSession,
  getSession,
};
