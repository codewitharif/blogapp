// controllers/blogController.js
const Blog = require("../models/blogModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");

// ✅ Create Blog
exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      image,
      tags,
      minutesToRead,
      authorName,
      authorImage,
    } = req.body;
    const author = req.clerkId; // Get author from authenticated user

    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const blog = new Blog({
      title,
      content,
      category,
      image,
      tags,
      author,
      authorName,
      authorImage,
      minutesToRead: minutesToRead,
    });

    await blog.save();

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating blog", error: err.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 blogs per page
    const skip = (page - 1) * limit;

    // Get total count for pagination info
    const totalBlogs = await Blog.countDocuments();

    // Get blogs with pagination
    const blogs = await Blog.find()
      .populate("category", "categoryName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalBlogs / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs,
        hasNextPage,
        hasPrevPage,
        limit,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: err.message });
  }
};

// ✅ Get single blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "category",
      "categoryName"
    );
    // ❌ Removed: .populate("author", "name email") - author is string not ObjectId
    // ❌ Removed: .populate("comments.user", "name email") - user is string not ObjectId

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching blog", error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, content, category, image, tags } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if user is the author of the blog
    if (blog.author.toString() !== req.clerkId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this blog" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;
    blog.image = image || blog.image;
    blog.tags = tags || blog.tags;

    await blog.save();

    res.json({ message: "Blog updated successfully", blog });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating blog", error: err.message });
  }
};

// ✅ Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if user is the author of the blog
    if (blog.author.toString() !== req.clerkId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: err.message });
  }
};

// ✅ Single endpoint that handles both like and unlike

// Controller logic:
exports.toggleLike = async (req, res) => {
  try {
    const userId = req.clerkId;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const isLiked = blog.likesBy.includes(userId);

    if (isLiked) {
      // Unlike: Remove user from likesBy
      blog.likesBy = blog.likesBy.filter((id) => id !== userId);
    } else {
      // Like: Add user to likesBy
      blog.likesBy.push(userId);
    }

    blog.likesCount = blog.likesBy.length;
    await blog.save();

    res.json({
      success: true,
      message: isLiked ? "Blog unliked" : "Blog liked",
      isLiked: !isLiked,
      likesCount: blog.likesCount,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error toggling like", error: err.message });
  }
};


exports.checkIfLiked = async (req, res) => {
  try {
    const userId = req.clerkId;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const isLiked = blog.likesBy.includes(userId);
    res.json({ success: true, isLiked });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error checking like", error: err.message });
  }
};

// ✅ Add comment
// Updated Controller - addComment function
exports.addComment = async (req, res) => {
  try {
    const { text, username } = req.body; // Get both text and username from request
    const userId = req.clerkId;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment text is required" });
    }

    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "Username is required" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.comments.push({
      user: userId,
      username: username.trim(), // Store the username
      text: text.trim(),
    });

    await blog.save();

    res.json({
      message: "Comment added successfully",
      comments: blog.comments,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: err.message });
  }
};
