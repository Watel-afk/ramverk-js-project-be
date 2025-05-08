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
      required: true,
    },
    type: {
      type: String,
      enum: ["VHS", "DVD"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "No price provided"],
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
