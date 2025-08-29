// components/BlogDetail/BlogDetail.js - Updated version with working share functionality
import React, { useState, useEffect } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import useBlogStore from "../store/store";
import Comments from "./Comments";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const BlogDetail = ({ selectedPost }) => {
  const navigate = useNavigate();
  const { userId, getToken } = useAuth();
  const { user } = useUser();
  const shareUrl = window.location.href;
  const title = selectedPost.title || "Check out this blog!";
  const { blogs, toggleBlogLike, checkBlogLikeStatus, updateBlogInStore } =
    useBlogStore();

  const [loading, setLoading] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [commentsCount, setCommentsCount] = useState(
    selectedPost.comments?.length || 0
  );

  // Local state for like management
  const [likeState, setLikeState] = useState({
    isLiked: selectedPost.isLiked || false,
    likesCount: selectedPost.likesCount || 0,
  });

  // Update local state when selectedPost changes (from store updates)
  useEffect(() => {
    setLikeState({
      isLiked: selectedPost.isLiked || false,
      likesCount: selectedPost.likesCount || 0,
    });
  }, [selectedPost.isLiked, selectedPost.likesCount]);

  useEffect(() => {
    // Check like status when component mounts - but preserve existing count
    const checkLikeStatus = async () => {
      try {
        const token = await getToken();
        const result = await checkBlogLikeStatus(selectedPost._id, token);

        // Update local state with API response
        setLikeState({
          isLiked: result.isLiked,
          likesCount: result.likesCount,
        });
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };

    if (userId) {
      // Only check if user is logged in
      checkLikeStatus();
    }
  }, [selectedPost._id, getToken, checkBlogLikeStatus, userId]);

  useEffect(() => {
    // Update comments count when selectedPost changes
    setCommentsCount(selectedPost.comments?.length || 0);
  }, [selectedPost.comments]);

  const handleLikeToggle = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      if (!token) {
        alert("Please login to like this post");
        return;
      }

      const result = await toggleBlogLike(selectedPost._id, token);
      if (result) {
        // Update local state immediately
        setLikeState({
          isLiked: result.isLiked,
          likesCount: result.likesCount,
        });
        alert(result.message);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      if (error.response?.status === 401) {
        alert("Please login to like this post");
      } else if (error.response?.status === 404) {
        alert("Blog post not found");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCommentsClick = () => {
    setCommentsOpen(true);
  };

  const handleCommentsClose = () => {
    setCommentsOpen(false);
  };

  const handleCommentsUpdate = (newCount) => {
    setCommentsCount(newCount);
  };

  const handlePostClick = (post) => {
    navigate(`/blog/${post._id}`);
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };

  const handleShareClose = () => {
    setShareModalOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Link copied to clipboard!");
      setShareModalOpen(false);
    }).catch(() => {
      alert("Failed to copy link");
    });
  };

  // Use local state instead of selectedPost
  const isLiked = likeState.isLiked;
  const likesCount = likeState.likesCount;

  // Get other blogs for "More Articles" section
  const otherBlogs = blogs
    .filter((blog) => blog._id !== selectedPost._id)
    .slice(0, 2);

  return (
    <>
      {/* Article Header */}
      <div className="relative">
        <img
          src={selectedPost.image}
          alt={selectedPost.title}
          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-3 sm:mb-4">
              <span className="inline-block px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full">
                {selectedPost.category?.categoryName || selectedPost.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {selectedPost.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-3 sm:space-y-0 text-white/90">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedPost.authorImage}
                  alt={selectedPost.authorName}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/30"
                />
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">
                    {selectedPost.authorName}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80">
                    {new Date(selectedPost.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs sm:text-sm text-white/80">
                <span>{selectedPost.minutesToRead} min read</span>

                {/* Likes */}
                <div className="flex items-center space-x-1">
                  {isLiked ? (
                    <IoMdHeart className="w-4 h-4 text-red-500" />
                  ) : (
                    <IoMdHeartEmpty className="w-4 h-4" />
                  )}
                  <span>{likesCount}</span>
                </div>

                {/* Comments */}
                <button
                  onClick={handleCommentsClick}
                  className="flex items-center space-x-1 hover:text-white transition-colors"
                >
                  <FaComment className="w-4 h-4" />
                  <span>{commentsCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-200">
          {/* Content rendering - Now handles HTML content from Jodit editor */}
          <div className="prose prose-sm sm:prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              className="text-gray-700 leading-relaxed"
            />
          </div>

          {/* Tags */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {selectedPost.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Social Actions */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 bg-gray-50 rounded-xl space-y-4 sm:space-y-0">
            <div className="flex items-center justify-center sm:justify-start space-x-4 sm:space-x-6">
              {/* Like Button - Updated with functionality */}
              <button
                onClick={handleLikeToggle}
                disabled={loading}
                className={`flex items-center space-x-2 transition-all duration-200 ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : isLiked
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-600 hover:text-red-500"
                } ${loading ? "" : "hover:scale-105"}`}
              >
                <span className="text-lg sm:text-xl">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                  ) : isLiked ? (
                    <IoMdHeart className="text-red-500" />
                  ) : (
                    <IoMdHeartEmpty />
                  )}
                </span>
                <span className="text-sm sm:text-base font-medium">
                  {likesCount}
                </span>
              </button>

              {/* Comments Button - Updated with click handler */}
              <button
                onClick={handleCommentsClick}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <span className="text-lg sm:text-xl">
                  <FaComment />
                </span>
                <span className="text-sm sm:text-base">{commentsCount}</span>
              </button>

              {/* Share Button - Fixed */}
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
              >
                <span className="text-lg sm:text-xl">🔗</span>
                <span className="text-sm sm:text-base">Share</span>
              </button>
            </div>

            <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm sm:text-base">
              Follow Author
            </button>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
            More Articles
          </h3>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {otherBlogs.map((post) => (
              <div
                key={post._id}
                onClick={() => handlePostClick(post)}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="p-4 sm:p-6">
                  <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {post.category?.categoryName || post.category}
                  </span>
                  <h4 className="mt-2 sm:mt-3 text-base sm:text-lg font-semibold text-gray-900">
                    {post.title}
                  </h4>
                  <p className="mt-1 sm:mt-2 text-gray-600 text-xs sm:text-sm">
                    {post.excerpt || post.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      <Comments
        blogId={selectedPost._id}
        isOpen={commentsOpen}
        onClose={handleCommentsClose}
        initialComments={selectedPost.comments || []}
        onCommentsUpdate={handleCommentsUpdate}
      />

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Share this post</h3>
              <button
                onClick={handleShareClose}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="flex justify-center space-x-4">
              <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>

              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>

              <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
            </div>
            
            {/* Copy Link Option */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={handleCopyLink}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetail;