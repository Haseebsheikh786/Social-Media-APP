const express = require("express");

const {
  createComment,
  getAllComments,
} = require("../controller/commentController");

const router = express.Router();

router.post("/", createComment);
router.get("/:postId", getAllComments);

module.exports = router;
