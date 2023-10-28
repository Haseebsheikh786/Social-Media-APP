const express = require("express");
const {
  login,
  FetchUserByID,
  FetchAllUser,
  addRemoveFriend,
  getUserFriends,
  FetchLoginUser, 
} = require("../controller/authController");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

router.route("/login").post(login);
router.get("/:id/user", validateToken, FetchUserByID);
router.get("/own", validateToken, FetchLoginUser);
router.get("/users", validateToken, FetchAllUser);
router.patch("/:id/:friendId", addRemoveFriend);
router.get("/getFriend", validateToken, getUserFriends);

module.exports = router;
