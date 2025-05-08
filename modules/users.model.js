const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username not provided"],
    },
    password: {
      type: String,
      required: [true, "Password not provided"],
    },
    salt: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
