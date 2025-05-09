const { getUserByName } = require("../factory/user.factory");

const getUserControlled = async (username) => {
  if (!username) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "Username is not provided"
    );
  }

  const user = await getUserByName(username);

  if (!user) {
    throwHTTPError(httpsUtil.HTTP_STATUS.BAD_REQUEST, "User does not exist");
  }

  return user;
};
