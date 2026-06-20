const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createPost,
  getMyPosts,
  deletePost,
  updatePost
} = require("../controllers/postController");

router.post("/", protect, createPost);

router.get("/", protect, getMyPosts);

router.delete("/:id", protect, deletePost);

router.put("/:id", protect, updatePost);

module.exports = router;