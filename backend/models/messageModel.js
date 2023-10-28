const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    text: {
      type: String,
      require: true,
    },
    senderId: {
      type: String,
      require: true,
    },
    chatId: {
      type: String,
      require: true,
    },
  },
  {
    timeStamp: true,
  }
);

const Message = mongoose.model("Message", messageModel);
module.exports = Message;
