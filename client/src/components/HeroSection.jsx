// components/HeroSection/HeroSection.js
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ featuredPost }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog/${featuredPost.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500">
        <div className="flex flex-col md:flex-row">
          <div className="md:flex-shrink-0 md:w-1/2 relative overflow-hidden">
            <img
              className="h-64 sm:h-80 md:h-full w-full object-cover transform hover:scale-105 transition-transform duration-700"
              src={featuredPost.image}
              alt={featuredPost.title}
            />
          </div>
          <div className="p-6 sm:p-8 lg:p-12 md:w-1/2 flex flex-col justify-center">
            {/* Hero content */}
            <div className="inline-block">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium rounded-full">
                {featuredPost.category}
              </span>
            </div>
            <h1 className="mt-4 sm:mt-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {featuredPost.title}
            </h1>
            <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
              {featuredPost.excerpt}
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center">
              <div className="flex items-center">
                <img
                  src={featuredPost.authorImage}
                  alt={featuredPost.author}
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-full"
                />
                <div className="ml-3 sm:ml-4">
                  <p className="text-base sm:text-lg font-medium text-gray-900">
                    {featuredPost.author}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-500 text-sm">
                    <span>{featuredPost.date}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{featuredPost.readTime}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>❤️ {featuredPost.likes}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleReadMore}
              className="mt-6 sm:mt-8 inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-base sm:text-lg font-medium"
            >
              Read Full Article
              <svg
                className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
