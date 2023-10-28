const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");

const allMessages = expressAsyncHandler(async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chatId });
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = expressAsyncHandler(async (req, res) => {
  const { text, chatId, senderId } = req.body;

  try {
    var message = new Message({
      text,
      chatId,
      senderId,
    });
    const resp = await message.save();
    res.status(200).json(resp);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
