// pages/BlogDetailPage.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BlogDetail from "../components/BlogDetail";
import BackHeader from "../components/BackHeader";

const BlogDetailPage = ({ posts }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the post by ID
  const selectedPost = posts.find((post) => post.id === parseInt(id));

  // Navigate back to home
  const goHome = () => {
    navigate("/");
  };

  // Navigate to another post
  const openPost = (post) => {
    navigate(`/blog/${post.id}`);
  };

  // If post not found, show error or redirect
  if (!selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <button
            onClick={goHome}
            className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BackHeader goHome={goHome} currentView="detail" />
      <BlogDetail
        selectedPost={selectedPost}
        posts={posts}
        openPost={openPost}
      />
    </div>
  );
};

export default BlogDetailPage;
