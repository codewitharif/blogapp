// components/BlogCard/BlogCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ post, openPost }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Use navigate instead of openPost for routing
    navigate(`/blog/${post.id}`);
  };

  return (
    <div
      key={post.id}
      onClick={handleClick}
      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500 cursor-pointer hover:scale-105 border border-gray-200"
    >
      <div className="relative overflow-hidden">
        <img
          className="h-48 sm:h-56 w-full object-cover group-hover:scale-110 transition-transform duration-700"
          src={post.image}
          alt={post.title}
        />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <span className="px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full">
            {post.category}
          </span>
        </div>
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/50 text-white text-xs sm:text-sm px-2 py-1 rounded">
          {post.readTime}
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
          {post.title}
        </h2>
        <p className="mt-2 sm:mt-3 text-gray-600 text-xs sm:text-sm leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center">
            <img
              src={post.authorImage}
              alt={post.author}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
            />
            <div className="ml-2 sm:ml-3">
              <p className="text-xs sm:text-sm font-medium text-gray-900">
                {post.author}
              </p>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center">❤️ {post.likes}</span>
            <span className="flex items-center">💬 {post.comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
