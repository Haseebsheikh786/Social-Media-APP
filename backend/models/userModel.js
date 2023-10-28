const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add the user name"],
    },
    email: {
      type: String,
      required: [true, "please add the user email address"],
      unique: [true, "Email addrss already taken"],
    },
    password: {
      type: String,
      required: [true, "please add the user password"],
    },
    photo: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },

    location: String,
    occupation: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
