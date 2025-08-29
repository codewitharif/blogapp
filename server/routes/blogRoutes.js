const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  toggleLike,
  checkIfLiked,
  addComment
} = require("../controllers/blogController");

const authUser = require("../middleware/auth");

const blogRouter = express.Router();

// Create a new blog (auth required)
blogRouter.post("/", authUser, createBlog);

// Get all blogs (public)
blogRouter.get("/", getAllBlogs);

// Get single blog by id (public)
blogRouter.get("/:id", getBlogById);

// Update blog (auth required)
blogRouter.put("/:id", authUser, updateBlog);

// Delete blog (auth required)
blogRouter.delete("/:id", authUser, deleteBlog);

// Like a blog (auth required)
// blogRouter.post("/:id/like", authUser, likeBlog);

// // Unlike a blog (auth required)
// blogRouter.delete("/:id/like", authUser, unlikeBlog);

blogRouter.post("/:id/toggle-like", authUser, toggleLike);
blogRouter.get("/:id/check-like", authUser, checkIfLiked);

// Add a comment (auth required)
blogRouter.post("/:id/comment", authUser, addComment);

module.exports = blogRouter;
