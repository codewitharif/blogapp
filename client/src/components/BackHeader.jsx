// components/Header/CreateBlogHeader.js
import React from "react";
import { Link } from "react-router-dom";

const BackHeader = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              WriteUp
            </Link>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center text-sm sm:text-base"
            >
              <svg
                className="w-4 h-4 mr-1 sm:mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BackHeader;
