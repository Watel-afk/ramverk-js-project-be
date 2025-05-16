const ItemListing = require("../modules/itemListing.model");

const getItemListing = async (id) => {
  if (!id) return null;

  return await ItemListing.findById(id);
};

const getItemListingByItemId = async (itemId) => {
  if (!itemId) return null;

  return await ItemListing.findOne({ itemId: itemId });
};

const getItemListingByItemAndOwner = async (owner, item) => {
  if (!item || !owner) return null;

  return await ItemListing.findOne({
    sellerId: owner._id,
    itemId: item._id,
    status: "available",
  });
};

module.exports = { getItemListing, getItemListingByItemAndOwner };
