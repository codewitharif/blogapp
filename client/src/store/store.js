// store/store.js
import { create } from "zustand";
import axios from "axios";

const useBlogStore = create((set, get) => ({
  // State
  blogs: [],
  categories: [],
  featuredPost: null,
  loading: false,
  error: null,
  pagination: null,

  // Actions
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Fetch categories
  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories`
      );

      set({ categories: response.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error("Error fetching categories:", error);
    }
  },

  // Fetch all blogs
  fetchBlogs: async (page = 1, limit = 10) => {
    try {
      set({ loading: true, error: null });

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/blogs?page=${page}&limit=${limit}`
      );

      const { blogs, pagination } = response.data;

      set({
        blogs: blogs,
        featuredPost: blogs.length > 0 ? blogs[blogs.length - 1] : null,
        pagination: pagination,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error("Error fetching blogs:", error);
    }
  },

  // Fetch single blog by ID
  //   fetchBlogById: async (id) => {
  //     try {
  //       const { blogs, addFetchedBlogToStore } = get();

  //       const existingBlog = blogs.find((blog) => blog._id === id);
  //       if (existingBlog) {
  //         return existingBlog;
  //       }

  //       const response = await axios.get(
  //         `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}`
  //       );

  //       const fetchedBlog = response.data.blog;
  //       addFetchedBlogToStore(fetchedBlog); // Store mein add kar do
  //       return fetchedBlog;
  //     } catch (error) {
  //       console.error("Error fetching blog:", error);
  //       throw error;
  //     }
  //   },

  // Update blog in store (for likes, comments, etc.)
  updateBlogInStore: (blogId, updates) => {
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog._id === blogId ? { ...blog, ...updates } : blog
      ),
      featuredPost:
        state.featuredPost && state.featuredPost._id === blogId
          ? { ...state.featuredPost, ...updates }
          : state.featuredPost,
    }));
  },

  // Toggle like for a blog
  toggleBlogLike: async (blogId, token) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${blogId}/toggle-like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Update the blog in store with new like data
        get().updateBlogInStore(blogId, {
          likesCount: response.data.likesCount,
          isLiked: response.data.isLiked,
        });

        return response.data;
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  },

  // Check if user liked a blog
  //   checkBlogLikeStatus: async (blogId, token) => {
  //     try {
  //       if (!token) return { isLiked: false, likesCount: 0 };

  //       const response = await axios.get(
  //         `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${blogId}/check-like`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       // Update the blog in store with like status
  //       get().updateBlogInStore(blogId, {
  //         likesCount: response.data.likesCount,
  //         isLiked: response.data.isLiked,
  //       });

  //       return response.data;
  //     } catch (error) {
  //       console.error("Error checking like status:", error);
  //       return { isLiked: false, likesCount: 0 };
  //     }
  //   },

  checkBlogLikeStatus: async (blogId, token) => {
    try {
      if (!token) return { isLiked: false, likesCount: 0 };

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${blogId}/check-like`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Get current blog data to preserve existing likesCount if API returns wrong count
      const { blogs, featuredPost } = get();
      let currentBlog = blogs.find((blog) => blog._id === blogId);
      if (!currentBlog && featuredPost && featuredPost._id === blogId) {
        currentBlog = featuredPost;
      }

      // Use API likesCount only if it's reasonable, otherwise keep current count
      const apiLikesCount = response.data.likesCount || 0;
      const currentLikesCount = currentBlog?.likesCount || 0;

      // Use API count only if it's not 0 when we have existing count, or if current count is 0
      const finalLikesCount =
        apiLikesCount === 0 && currentLikesCount > 0
          ? currentLikesCount
          : apiLikesCount;

      // Update the blog in store with like status
      get().updateBlogInStore(blogId, {
        likesCount: finalLikesCount,
        isLiked: response.data.isLiked,
      });

      return {
        isLiked: response.data.isLiked,
        likesCount: finalLikesCount,
      };
    } catch (error) {
      console.error("Error checking like status:", error);

      // Return current state if API fails
      const { blogs, featuredPost } = get();
      let currentBlog = blogs.find((blog) => blog._id === blogId);
      if (!currentBlog && featuredPost && featuredPost._id === blogId) {
        currentBlog = featuredPost;
      }

      return {
        isLiked: currentBlog?.isLiked || false,
        likesCount: currentBlog?.likesCount || 0,
      };
    }
  },

  // Add new blog to store
  addBlog: (newBlog) => {
    set((state) => ({
      blogs: [newBlog, ...state.blogs],
      featuredPost: newBlog, // Make the new blog the featured post
    }));
  },

  // Get filtered blogs by category
  getFilteredBlogs: (category) => {
    const { blogs } = get();
    if (category === "All") return blogs;
    return blogs.filter((blog) => blog.category?.categoryName === category);
  },

  // Get formatted categories for UI
  getFormattedCategories: () => {
    const { categories } = get();
    return ["All", ...categories.map((c) => c.categoryName)];
  },

  // Fetch blogs with pagination (for MoreBlogsPage)
  fetchBlogsWithPagination: async (page = 1, limit = 9) => {
    try {
      set({ loading: true, error: null });

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/blogs?page=${page}&limit=${limit}`
      );

      const { blogs, pagination } = response.data;

      // For pagination page, we don't want to replace the main blogs array
      // This method is specifically for paginated views
      set({ loading: false });

      return { blogs, pagination };
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      throw error;
    }
  },
  // Add comment to a blog
  addComment: async (blogId, text, username, token) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${blogId}/comment`,
        {
          text,
          username, // Add username to request body
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.comments) {
        // Update the blog in store with new comments
        get().updateBlogInStore(blogId, {
          comments: response.data.comments,
        });

        return response.data;
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },
  // store/store.js mein add karo
  // Add this new method in your store
  // addFetchedBlogToStore: (blog) => {
  //   set((state) => ({
  //     blogs: state.blogs.some(b => b._id === blog._id)
  //       ? state.blogs
  //       : [blog, ...state.blogs]
  //   }));
  // },,
//   addFetchedBlogToStore: (blog) => {
//     if (!blog || !blog._id) {
//       console.error("Invalid blog data:", blog);
//       return;
//     }

//     set((state) => ({
//       blogs: state.blogs.some((b) => b && b._id === blog._id)
//         ? state.blogs
//         : [blog, ...state.blogs],
//     }));
//   },
// Add this updated function to your store.js
addFetchedBlogToStore: (blog) => {
  // Validate blog data before adding to store
  if (!blog) {
    console.error("Cannot add blog: blog is null or undefined");
    return false;
  }
  
  if (!blog._id) {
    console.error("Cannot add blog: missing _id property", blog);
    return false;
  }
  
  // Validate required blog properties
  const requiredFields = ['title', 'content'];
  const missingFields = requiredFields.filter(field => !blog[field]);
  
  if (missingFields.length > 0) {
    console.warn("Blog missing some fields:", missingFields, blog);
    // Still proceed as these might not be critical
  }
  
  console.log("Adding valid blog to store:", blog._id);
  
  set((state) => ({
    blogs: state.blogs.some(b => b && b._id === blog._id) 
      ? state.blogs 
      : [blog, ...state.blogs]
  }));
  
  return true;
},
//   fetchBlogById: async (id) => {
//     try {
//       console.log("i got the id ", id);

//       const { blogs, addFetchedBlogToStore } = get();

//       // First check if blog exists in current blogs array
//       const existingBlog = blogs.find((blog) => blog._id === id);
//       if (existingBlog) {
//         return existingBlog;
//       }

//       // If not found, fetch from API
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}`
//       );

//       const fetchedBlog = response.data.blog;

//       // Add to store so it can be accessed by components
//       addFetchedBlogToStore(fetchedBlog);

//       return fetchedBlog;
//     } catch (error) {
//       console.error("Error fetching blog:", error);
//       throw error;
//     }
//   },
// Replace your fetchBlogById function in store.js with this:
// Replace your fetchBlogById function in store.js with this:
fetchBlogById: async (id) => {
  try {
    console.log("Fetching blog with id:", id);
    
    if (!id) {
      throw new Error("Blog ID is required");
    }

    const { blogs, addFetchedBlogToStore } = get();

    // First check if blog exists in current blogs array
    const existingBlog = blogs.find((blog) => blog && blog._id === id);
    if (existingBlog) {
      console.log("Blog found in store:", existingBlog);
      return existingBlog;
    }

    // If not found, fetch from API
    console.log("Fetching from API...");
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}`
    );

    console.log("API Response:", response.data);

    // Validate API response - blog data is directly in response.data
    if (!response.data || !response.data._id) {
      throw new Error("Invalid API response: blog data not found");
    }

    const fetchedBlog = response.data; // Blog data is directly in response.data, not response.data.blog
    
    // Validate fetched blog data
    if (!fetchedBlog || !fetchedBlog._id) {
      throw new Error("Invalid blog data received from API");
    }
    
    console.log("Valid blog data received:", fetchedBlog);
    
    // Add to store so it can be accessed by components
    addFetchedBlogToStore(fetchedBlog);
    
    return fetchedBlog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    
    // Don't try to add undefined to store on error
    if (error.response?.status === 404) {
      throw new Error("Blog not found");
    } else if (error.response?.status === 500) {
      throw new Error("Server error occurred");
    } else if (error.message.includes("Network Error")) {
      throw new Error("Network connection failed");
    } else {
      throw new Error(error.message || "Failed to fetch blog");
    }
  }
},
}));

export default useBlogStore;
