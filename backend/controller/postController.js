const Post = require("../models/postModel");
const User = require("../models/userModel");
exports.createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      name: user.username,
      location: user.location,
      userPicturePath: user.photo,
      description,
      picturePath: req.file.filename,
      likes: {},
    });
    await newPost.save();

    res.status(200).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err);
  }
};
