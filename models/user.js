const mongoose = require("mongoose");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
    },

    verified: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User, emailRegexp };
