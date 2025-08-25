// components/Header/MobileMenu.js
import React from "react";
import { Link } from "react-router-dom";

const MobileMenu = ({ goToCreateBlog, goHome }) => {
  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
        <a
          href="#"
          className="block px-3 py-2 text-gray-600 hover:text-gray-900"
        >
          Home
        </a>
        <Link
          to="/create-blog"
          className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900"
        >
          Write
        </Link>
        <a
          href="#"
          className="block px-3 py-2 text-gray-600 hover:text-gray-900"
        >
          Categories
        </a>
        <a
          href="#"
          className="block px-3 py-2 text-gray-600 hover:text-gray-900"
        >
          About
        </a>
        <a
          href="#"
          className="block px-3 py-2 text-gray-600 hover:text-gray-900"
        >
          Contact
        </a>
        <button className="w-full text-left bg-gray-900 text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-colors mt-2">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
