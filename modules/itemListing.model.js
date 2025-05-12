const mongoose = require("mongoose");

const ItemListingSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    price: {
      type: Number,
      min: [1, "Price must be a positive number"],
      required: [true, "No price provided"],
    },
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },
  },
  { timestamps: true }
);

const ItemListing = mongoose.model("ItemListing", ItemListingSchema);

module.exports = ItemListing;
