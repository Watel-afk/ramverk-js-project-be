const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../utils/utils");

const {
  buyItemListing,
  createItemListing,
  getMyItemListings,
  getAvailableItemListings,
} = require("../controllers/itemListing.controller");

router.post("/:id/buy-item-listing", asyncWrapper(buyItemListing));
router.post("/create-item-listing", asyncWrapper(createItemListing));
router.get(
  "/get-available-item-listings",
  asyncWrapper(getAvailableItemListings)
);
router.get("/get-my-item-listings", asyncWrapper(getMyItemListings));

module.exports = router;
