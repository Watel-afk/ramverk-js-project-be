const User = require("../modules/users.model");

const getUserByName = async (username) => {
  if (!username) return null;

  const user = await User.findOne({ username: username });

  return user;
};

module.exports = { getUserByName };
