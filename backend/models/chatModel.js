const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    members: Array,
  },
  {
    timeStamp: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;
