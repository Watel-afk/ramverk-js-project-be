const {
  getItemListingByItemAndOwner,
} = require("../factory/itemListing.factory");
const httpsUtil = require("../utils/httpsUtil");
const { throwHTTPError } = require("./error.manager.js");

// ------------------- Endpoint validations -------------------
const validateBuyItemListing = (user, itemListing) => {
  validateUserDoesNotOwnItemListing(user, itemListing);
  validateUserHasEnoughMoney(user, itemListing);
};

const validateCreateItemListing = async (user, item) => {
  validateUserOwnsItem(user, item);
  await validateItemListingNotAlreadyExists(item);
};

const validateRemoveItemListing = (user, itemListing) => {
  validateUserOwnsListing(user, itemListing);
  validateItemListingIsAvailable(itemListing);
};

// ------------------- Validations -------------------
const validateUserOwnsItem = (user, item) => {
  if (user._id.toString() !== item.ownerId.toString()) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "User does not own the item"
    );
  }
};

const validateUserOwnsListing = (user, itemListing) => {
  if (user._id.toString() !== itemListing?.sellerId.toString()) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "User does not own the item listing"
    );
  }
};

const validateItemListingIsAvailable = (itemListing) => {
  if (itemListing.status !== "available") {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "Can not remove listing that is not available"
    );
  }
};

const validateUserHasEnoughMoney = (user, itemListing) => {
  if (user.balance < itemListing.price) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "User does not have enough money"
    );
  }
};

const validateUserDoesNotOwnItemListing = (user, itemListing) => {
  if (user._id.toString() === itemListing.sellerId.toString()) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "Can not buy own item listing"
    );
  }
};

const validateItemListingNotAlreadyExists = async (user, item) => {
  const itemListing = await getItemListingByItemAndOwner(user, item);

  if (itemListing) {
    throwHTTPError(
      httpsUtil.HTTP_STATUS.BAD_REQUEST,
      "Item is already listed for sale"
    );
  }
};

module.exports = {
  validateCreateItemListing,
  validateBuyItemListing,
  validateRemoveItemListing,
};
