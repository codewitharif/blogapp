// components/Comments/Comments.js - CORRECTED VERSION
import React, { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { FaComment, FaTimes } from "react-icons/fa";
import useBlogStore from "../store/store";

const Comments = ({
  blogId,
  isOpen,
  onClose,
  initialComments = [],
  onCommentsUpdate,
  authorImage,
}) => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const { addComment } = useBlogStore(); // Use store method
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert("Please enter a comment");
      return;
    }

    if (!user) {
      alert("Please login to add a comment");
      return;
    }

    try {
      setSubmitting(true);
      const token = await getToken();

      // Get username from user object (Clerk provides this)
      const username =
        user.username ||
        user.firstName ||
        user.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
        "Anonymous";

      // Use the store method directly with username and user image
      const response = await addComment(
        blogId,
        newComment.trim(),
        username,
        token,
        user.imageUrl // Pass user's profile image
      );

      if (response.comments) {
        setComments(response.comments);
        setNewComment("");

        // Update parent component with new comments count
        if (onCommentsUpdate) {
          onCommentsUpdate(response.comments.length);
        }

        alert("Comment added successfully!");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      if (error.response?.status === 401) {
        alert("Please login to add a comment");
      } else if (error.response?.status === 404) {
        alert("Blog post not found");
      } else {
        alert("Failed to add comment. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <FaComment className="text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Comments ({comments.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FaComment className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="flex space-x-3">
                  {/* User Avatar - Using actual profile image or fallback */}
                  <div className="flex-shrink-0">
                    {comment.userImage ? (
                      <img
                        src={comment.userImage}
                        alt={comment.username || "User"}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          // Fallback to initial avatar if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center ${
                        comment.userImage ? 'hidden' : 'flex'
                      }`}
                    >
                      <span className="text-xs font-medium text-white">
                        {(comment.username || comment.user || "A")
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Comment Content */}
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {comment.username ||
                            `User ${comment.user?.slice(-6)}`}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Form */}
          <div className="border-t border-gray-200 p-6">
            <form onSubmit={handleAddComment} className="space-y-3">
              <div className="flex space-x-3">
                {/* Current user's avatar */}
                <div className="flex-shrink-0">
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={user.firstName || "You"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {user ? (user.firstName?.[0] || user.username?.[0] || "U").toUpperCase() : "G"}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={
                      user ? "Write a comment..." : "Please login to comment"
                    }
                    disabled={!user || submitting}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between pl-11">
                <span className="text-xs text-gray-500">
                  {newComment.length}/500 characters
                </span>
                <button
                  type="submit"
                  disabled={
                    !user ||
                    submitting ||
                    !newComment.trim() ||
                    newComment.length > 500
                  }
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Posting...</span>
                    </div>
                  ) : (
                    "Post Comment"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;