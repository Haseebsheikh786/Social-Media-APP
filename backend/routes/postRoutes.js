const express = require("express");
const {
  getAllPosts,
  getUserPosts,
  likePost,
} = require("../controller/postController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.get("/", getAllPosts);
// router.get("/:userId", getUserPosts);

router.patch("/:id", likePost);

module.exports = router;
