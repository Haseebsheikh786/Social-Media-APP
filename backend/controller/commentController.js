const { Comment } = require("../models/commentModel");
const User = require("../models/userModel");

exports.createComment = async (req, res) => {
  try {
    const { userId, description, postId } = req.body;
    const user = await User.findById(userId);

    const newComment = new Comment({
      userId,
      description,
      postId,
      name: user.username,
    });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comment = await Comment.find({ postId });
    res.status(200).json(comment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
