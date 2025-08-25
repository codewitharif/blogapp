// components/Newsletter/Newsletter.js
import React from "react";

const Newsletter = () => {
  return (
    <div className="bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Stay Updated</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of readers who get fresh perspectives and cutting-edge
          insights delivered weekly.
        </p>

        {/* Responsive Input + Button */}
        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-6 py-4 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
          <button className="px-8 py-4 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors font-medium">
            Subscribe
          </button>
        </div>

        <p className="mt-4 text-gray-400 text-sm">
          No spam, unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
