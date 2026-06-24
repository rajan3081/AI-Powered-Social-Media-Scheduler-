const Post = require("../models/Post");

// ================= CREATE POST =================

const createPost = async (req, res) => {

  try {

    const { caption, image, scheduledTime } = req.body;

    const post = await Post.create({
      user: req.user.id,
      caption,
      image,
      scheduledTime
    });

    res.status(201).json({
      message: "Post Created Successfully",
      post
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ================= GET MY POSTS =================

const getMyPosts = async (req, res) => {

  try {

    const posts = await Post.find({
      user: req.user.id
    });

    res.status(200).json(posts);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ================= DELETE POST =================

const deletePost = async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    // check post exists
    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    // check ownership
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    await post.deleteOne();

    res.status(200).json({
      message: "Post Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ================= UPDATE POST =================

const updatePost = async (req, res) => {

  try {

    const { caption, image, scheduledTime } = req.body;

    const post = await Post.findById(req.params.id);

    // check post exists
    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    // check ownership
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    // update post
    post.caption = caption || post.caption;
    post.image = image || post.image;
    post.scheduledTime = scheduledTime || post.scheduledTime;

    const updatedPost = await post.save();

    res.status(200).json({
      message: "Post Updated Successfully",
      updatedPost
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ================= EXPORTS =================

module.exports = {
  createPost,
  getMyPosts,
  deletePost,
  updatePost
};