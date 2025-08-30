// components/Header/Header.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { IoNotifications } from "react-icons/io5";

const Header = ({
  goHome,
  goToCreateBlog,
  mobileMenuOpen,
  setMobileMenuOpen,
  currentView,
}) => {
  const { openSignIn, openUserProfile, signOut } = useClerk(); // openUserProfile add kiya
  const { isSignedIn, user } = useUser();
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Dummy notifications
  const notifications = [
    {
      id: 1,
      message: "Aman has created a new blog",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      message: "Jamal has created a new blog",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      message: "Sarah commented on your blog",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      message: "New follower: Alex Johnson",
      time: "5 hours ago",
      read: true,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl sm:text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              WriteUp
            </Link>
          </div>

          {/* Mobile menu buttons */}
          <div className="md:hidden flex items-center space-x-3 relative">
            {/* Notification button for mobile */}
            <button
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setMobileMenuOpen(false); // Close mobile menu when opening notifications
              }}
              className="text-gray-600 hover:text-gray-900 focus:outline-none relative"
            >
              <IoNotifications className="h-6 w-6" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Hamburger menu button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setNotificationOpen(false); // Close notifications when opening mobile menu
              }}
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

            {/* Notifications dropdown for mobile */}
            {notificationOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Notifications
                  </h3>
                </div>
                <div>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 relative ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                    >
                      <p className="text-sm text-gray-800">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                      {!notification.read && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </a>
            {isSignedIn && (
              <Link
                to="/create-blog"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Write
              </Link>
            )}

            <Link
              to="/blogs"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Blogs
            </Link>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </a>

            {isSignedIn ? (
              <div className="flex items-center gap-4">
                {/* Notification button for desktop */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    className="text-gray-600 hover:text-gray-900 focus:outline-none relative"
                  >
                    <IoNotifications className="h-6 w-6" />
                    {/* Notification badge */}
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </button>

                  {/* Notifications dropdown for desktop */}
                  {notificationOpen && (
                    <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Notifications
                        </h3>
                      </div>
                      <div>
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 relative ${
                              !notification.read ? "bg-blue-50" : ""
                            }`}
                          >
                            <p className="text-sm text-gray-800">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                            {!notification.read && (
                              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="p-3 text-center border-t border-gray-200">
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          View All Notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <UserButton />
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

        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                Home
              </a>
              {isSignedIn && (
                <Link
                  to="/create-blog"
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Write
                </Link>
              )}

              <Link
                to="/blogs"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Blogs
              </Link>

              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                About
              </a>

              {/* Manage Account button - ye change kiya */}
              {isSignedIn && (
                <button
                  onClick={() => {
                    openUserProfile();
                    setMobileMenuOpen(false); // Menu close kar dete hain
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  Manage Account
                </button>
              )}

              {!isSignedIn ? (
                <button
                  onClick={() => openSignIn({})}
                  className="w-full text-left bg-gray-900 text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-colors mt-2"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => signOut()}
                  className="w-full text-left bg-gray-900 text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-colors mt-2"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;