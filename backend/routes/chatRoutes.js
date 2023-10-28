const express = require("express");
const router = express.Router();
const {
  fetchChats,
  createChat,
  fetchChatById,
} = require("../controller/chatController");

router.post("/", createChat);
router.get("/:userId", fetchChats);
router.get("/find/:firstId/:secondId", fetchChatById);

module.exports = router;
