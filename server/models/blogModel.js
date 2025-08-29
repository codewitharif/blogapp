const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String, // will store HTML content
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String, // blog thumbnail / cover image
      required: false,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    // ✅ CORRECTED: Changed to String array for clerkId
    likesBy: [
      {
        type: String, // Store clerkId as string
        trim: true,
      },
    ],
    likesCount: {
      type: Number,
      default: 0, // start with 0 likes
    },
    comments: [
      {
        // ✅ CORRECTED: Changed to String for clerkId
        user: {
          type: String, // Store clerkId as string
          required: true,
          trim: true,
        },
        username: {
          type: String, // Store username for display
          trim: true,
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // ✅ CORRECTED: Removed ref since it's a String
    author: {
      type: String, // Store clerkId as string
      required: true,
      trim: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorImage: {
      type: String,
      required: false,
    },
    minutesToRead: {
      type: Number,
      default: 3,
    },
  },
  { timestamps: true } // auto add createdAt, updatedAt
);

module.exports = mongoose.model("Blog", blogSchema);
