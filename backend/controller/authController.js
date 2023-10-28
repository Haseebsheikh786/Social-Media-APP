const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  ``;
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

const register = expressAsyncHandler(async (req, res) => {
  const { username, email, password, occupation, location } = req.body;
  // if any field is empty
  if (!username || !email || !password) {
    res.status(400).json({ error: "All fields are mandatory" });
    throw new Error("All fields are mandatory");
  }

  // if email available in database
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json({ error: "User already registerd" });
    throw new Error("User already registerd");
  }

  // password Hashing
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    photo: req.file.filename,
    occupation,
    location,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
    });
  } else {
    res.status(400).json({ error: "user data is not valid" });
    throw new Error("user data is not valid");
  }
  res.json({ message: "Register the user" });
});

const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "All fields are mandatory" });
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (
    userAvailable &&
    (await bcrypt.compare(password, userAvailable.password))
  ) {
    const token = createToken(userAvailable._id);
    res.status(200).json({
      token,
      _id: userAvailable._id,
      email: userAvailable.email,
      username: userAvailable.username,
      photo: userAvailable.photo,
      location: userAvailable.location,
      friends: userAvailable.friends,
      occupation: userAvailable.occupation,
    });
  } else {
    auth = false;
    res.status(400).json({ error: "email or password is not valid" });
    throw new Error("email or password is not valid");
  }
});

const FetchLoginUser = expressAsyncHandler(async (req, res) => {
  const id = req.user._id;
  try {
    const userAvailable = await User.findById(id);
    res.status(200).json({
      _id: userAvailable._id,
      email: userAvailable.email,
      username: userAvailable.username,
      photo: userAvailable.photo,
      location: userAvailable.location,
      friends: userAvailable.friends,
      occupation: userAvailable.occupation,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
const FetchUserByID = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

const FetchAllUser = expressAsyncHandler(async (req, res) => {
  try {
    const currentUserID = req.user._id;
    const user = await User.find({ _id: { $ne: currentUserID } });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

const getUserFriends = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (user) {
      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, username, occupation, location, photo }) => {
          return { _id, username, occupation, location, photo };
        }
      );
      res.status(200).json(formattedFriends);
    } else {
      console.log("user nahi ha");
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err, "err ha haseeb");
  }
});
const addRemoveFriend = expressAsyncHandler(async (req, res) => {
  try {
    const { friendId, id } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, username, occupation, location, photo }) => {
        return { _id, username, occupation, location, photo };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err, "err");
  }
});

module.exports = {
  register,
  login,
  FetchUserByID,
  FetchAllUser,
  getUserFriends,
  addRemoveFriend,
  FetchLoginUser,
};
