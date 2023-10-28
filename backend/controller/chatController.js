const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");

const createChat = asyncHandler(async (req, res) => {
  const { secondId, firstId } = req.body;

  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) return res.status(200).json(chat);

    const newChat = new Chat({
      members: [firstId, secondId],
    });
    const resp = await newChat.save();
    res.status(200).json(resp);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  try {
    const chat = await Chat.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchChatById = asyncHandler(async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  createChat,
  fetchChats,
  fetchChatById,
};
