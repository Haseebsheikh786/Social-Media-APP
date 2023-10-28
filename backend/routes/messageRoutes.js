const express = require("express");
const { allMessages, sendMessage } = require("../controller/messageController");

const router = express.Router();

router.get("/:chatId", allMessages);
router.post("/", sendMessage);

module.exports = router;
