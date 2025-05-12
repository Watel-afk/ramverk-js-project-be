const ItemListing = require("../modules/itemListing.model");
const { getCurrentUser } = require("../manager/user.manager");
const {
  getItemControlled,
  getItemListingControlled,
} = require("./utils.controller");
const {
  validateCreateItemListing,
  validateBuyItemListing,
} = require("../manager/itemListing.manager");
const httpUtils = require("../utils/httpsUtil");

// ------------------- Buy item listing -------------------
const buyItemListing = async (req, res) => {
  const { id } = req.params;

  const itemListing = await getItemListingControlled(id);
  const user = await getCurrentUser(req);

  validateBuyItemListing(user, itemListing);

  const item = await getItemControlled(itemListing.itemId);

  item.ownerId = user._id;
  item.purchasedPrice = itemListing.price;

  user.balance -= itemListing.price;

  itemListing.status = "sold";

  await item.save();
  await user.save();
  await itemListing.save();

  res.status(httpUtils.HTTP_STATUS.OK).json({ itemListing });
};

// ------------------- create new item listing -------------------
const createItemListing = async (req, res) => {
  const itemId = req.body?.itemId;
  const price = req.body?.price;
  const item = await getItemControlled(itemId);
  const user = await getCurrentUser(req);

  await validateCreateItemListing(user, item);

  const itemListing = await ItemListing.create({
    itemId,
    price,
    sellerId: user._id,
    status: "available",
  });
  res.status(httpUtils.HTTP_STATUS.OK).json({ itemListing });
};

// ------------------- gey my item listings -------------------
const getMyItemListings = async (req, res) => {
  const user = await getCurrentUser(req);

  const itemListings = await ItemListing.find({
    sellerId: user._id.toString(),
    status: "available",
  })
    .sort({
      createdAt: -1,
    })
    .populate("itemId");

  res.status(httpUtils.HTTP_STATUS.OK).json({ itemListings });
};

// ------------------- Get available item listings -------------------
const getAvailableItemListings = async (_, res) => {
  const itemListings = await ItemListing.find({ status: "available" })
    .sort({
      createdAt: -1,
    })
    .populate("itemId");

  res.status(httpUtils.HTTP_STATUS.OK).json({ itemListings });
};

module.exports = {
  getMyItemListings,
  getAvailableItemListings,
  createItemListing,
  buyItemListing,
};
