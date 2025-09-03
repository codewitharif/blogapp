// pages/BlogDetailPage.js
import React, { useState, useEffect, useMemo } from "react";
import { LuLoader } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import BlogDetail from "../components/BlogDetail";
import BackHeader from "../components/BackHeader";
import useBlogStore from "../store/store";

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs, featuredPost, fetchBlogById } = useBlogStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBlog, setCurrentBlog] = useState(null);

  // Memoize the current blog to ensure it updates when store changes
  const selectedPost = useMemo(() => {
    // First check if we have a currentBlog from state
    if (currentBlog && currentBlog._id === id) {
      return currentBlog;
    }

    // Then check in store - but add safety checks
    let foundPost =
      blogs && blogs.length > 0
        ? blogs.find((post) => post && post._id === id)
        : null;
    if (!foundPost && featuredPost && featuredPost._id === id) {
      foundPost = featuredPost;
    }
    return foundPost || currentBlog;
  }, [blogs, featuredPost, id, currentBlog]);

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if blog already exists in store with safety checks
        let foundPost =
          blogs && blogs.length > 0
            ? blogs.find((post) => post && post._id === id)
            : null;
        if (!foundPost && featuredPost && featuredPost._id === id) {
          foundPost = featuredPost;
        }

        // If not found, fetch from API
        if (!foundPost) {
          try {
            const fetchedBlog = await fetchBlogById(id);
            if (fetchedBlog && fetchedBlog._id) {
              setCurrentBlog(fetchedBlog);
            } else {
              throw new Error("Invalid blog data received");
            }
          } catch (fetchError) {
            console.error("Fetch error:", fetchError);

            // Set specific error messages based on error type
            if (fetchError.message === "Blog not found") {
              setError("Blog post not found");
            } else if (fetchError.message === "Network connection failed") {
              setError("Network error - please check your connection");
            } else if (fetchError.message === "Server error occurred") {
              setError("Server error - please try again later");
            } else {
              setError("Failed to load blog post");
            }
            return;
          }
        } else {
          setCurrentBlog(foundPost);
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadBlogPost();
    }
  }, [id, fetchBlogById]); // Remove blogs and featuredPost from dependencies to avoid infinite loop

  // Update currentBlog when store updates
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const foundPost = blogs.find((post) => post && post._id === id);
      if (foundPost) {
        setCurrentBlog(foundPost);
      }
    }
    if (featuredPost && featuredPost._id === id) {
      setCurrentBlog(featuredPost);
    }
  }, [blogs, featuredPost, id]);

  // Separate useEffect to handle when blog is loaded
  useEffect(() => {
    if (!loading && !selectedPost) {
      setError("Post not found");
    }
  }, [loading, selectedPost]);

  const goHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      // <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      //   <div className="text-center">
      //     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      //     <p className="mt-4 text-gray-600">Loading...</p>
      //   </div>
      // </div>
      <div className="flex justify-center items-center py-20">
        <LuLoader className="animate-spin text-4xl text-gray-600" />
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    );
  }

  if (error || !selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Post Not Found"}
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
      <BlogDetail selectedPost={selectedPost} />
    </div>
  );
};

export default BlogDetailPage;
