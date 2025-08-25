// components/Header/Header.js
import React from "react";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Header = ({
  goHome,
  goToCreateBlog,
  mobileMenuOpen,
  setMobileMenuOpen,
  currentView,
}) => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl sm:text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              BlogHub
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </a>
            <Link
              to="/create-blog"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Write
            </Link>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </a>

            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label={`My Plan : ${"" || 0}`}
                      labelIcon={<a width={15} />}
                      onClick={() => {}}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            ) : (
              <button
                onClick={() => openSignIn({})}
                className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <MobileMenu goToCreateBlog={goToCreateBlog} goHome={goHome} />
        )}
      </div>
    </nav>
  );
};

export default Header;
