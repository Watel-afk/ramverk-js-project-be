var crypto = require("crypto");

const isValidPassword = (user, password) => {
  if (!user || !password) {
    return false;
  }

  const hash = crypto
    .pbkdf2Sync(password, user.salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return hash === user.password;
};

module.exports = { isValidPassword };
