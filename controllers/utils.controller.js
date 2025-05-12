const { getUserByName } = require("../factory/user.factory");
const { getItem } = require("../factory/item.factory");
const { getItemListing } = require("../factory/itemListing.factory");

// ------------------- Item -------------------
const getItemControlled = async (id) => {
  if (!id) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "Item id is not provided"
    );
  }

  const item = await getItem(id);

  if (!item) {
    throwHTTPError(httpsUtil.HTTP_STATUS.BAD_REQUEST, "Item does not exist");
  }

  return item;
};

// ------------------- ItemListing -------------------
const getItemListingControlled = async (id) => {
  if (!id) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "Item listing id is not provided"
    );
  }

  const itemListing = await getItemListing(id);

  if (!itemListing) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "Item listing does not exist"
    );
  }

  return itemListing;
};

// ------------------- User -------------------
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

module.exports = {
  getUserControlled,
  getItemControlled,
  getItemListingControlled,
};
