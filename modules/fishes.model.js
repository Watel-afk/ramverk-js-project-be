const mongoose = require("mongoose");

const FishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this fish."],
    },
    edible: {
      type: Boolean,
      required: true,
      default: false,
    },
    taste: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide a price for this fish."],
    },
    image: {
      type: String,
      required: [true, "Please provide an image for this fish."],
    },
  },
  { timestamps: true }
);

const Fish = mongoose.model("Fishe", FishSchema);

module.exports = Fish;
