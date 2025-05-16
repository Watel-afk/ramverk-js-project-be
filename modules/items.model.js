const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this fish."],
    },
    description: {
      type: String,
      required: [true, "Please provide a name for this fish."],
    },
    category: {
      type: String,
      enum: ["Movie", "Series", "Game"],
      message:
        "{VALUE} is not a valid category. Allowed categories are: Movie, Series, Game.",
      required: [true, "Category is required"],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["VHS", "DVD", "Cartridge", "Blu-ray", "Other"],
      required: true,
    },
    publishedYear: {
      type: Number,
      required: [true, "No published year provided"],
      min: [1800, "Published year must be after 1800"],
      max: [new Date().getFullYear(), "Published year cannot be in the future"],
    },
    purchasedPrice: {
      type: Number,
      required: [true, "No purchased price provided"],
      min: [0, "Purchased price must be a positive number"],
    },
    imageLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
