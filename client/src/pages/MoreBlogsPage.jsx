// pages/MoreBlogsPage.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import BackHeader from "../components/BackHeader";
import { LuLoader } from "react-icons/lu";
import useBlogStore from "../store/store";

const MoreBlogsPage = () => {
  const navigate = useNavigate();
  const {
    blogs: storeBlogs,
    loading: storeLoading,
    fetchBlogsWithPagination,
  } = useBlogStore();

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (pageNo) => {
    try {
      setLoading(true);

      // Use the store method for consistency
      const result = await fetchBlogsWithPagination(pageNo, 9);

      setBlogs(result.blogs || []);
      setTotalPages(result.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      // Fallback to store blogs if API fails
      if (storeBlogs.length > 0) {
        const startIndex = (pageNo - 1) * 9;
        const endIndex = startIndex + 9;
        setBlogs(storeBlogs.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(storeBlogs.length / 9));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const goHome = () => {
    navigate("/");
  };

  // Show loading state
  const isLoading = loading || storeLoading;

  return (
    <div className="min-h-screen bg-gray-50">
      <BackHeader goHome={goHome} currentView="blogs" />
    

      <div className="max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            All Blog Posts
          </h1>
          <p className="text-gray-600">Discover all our articles and stories</p>
        </div>

        {/* Loader */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LuLoader className="animate-spin text-4xl text-gray-600" />
            <span className="ml-3 text-gray-600">Loading blogs...</span>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => (
              <BlogCard key={post._id || post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No blogs found
              </h3>
              <p className="text-gray-500 mb-6">
                There are no blog posts available at the moment.
              </p>
              <button
                onClick={goHome}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Go Back Home
              </button>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className={`px-5 py-2 rounded-lg shadow font-medium transition-colors ${
                page === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {/* Show page numbers for better UX */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      page === pageNum
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className={`px-5 py-2 rounded-lg shadow font-medium transition-colors ${
                page === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Page Info */}
        {!isLoading && totalPages > 1 && (
          <div className="text-center mt-4 text-sm text-gray-500">
            Showing page {page} of {totalPages} ({blogs.length} posts on this
            page)
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreBlogsPage;