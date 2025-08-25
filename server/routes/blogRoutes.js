const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeBlog,
  commentOnBlog,
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

// Like a blog (auth required, but only increments likes count)
blogRouter.post("/:id/like", authUser, likeBlog);

// Add a comment (auth required)
blogRouter.post("/:id/comment", authUser, commentOnBlog);

module.exports = blogRouter;
