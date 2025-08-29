// components/CreateBlog/CreateBlog.js
import React, { useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import useBlogStore from "../store/store";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";
import BackHeader from "./BackHeader";

const CreateBlog = ({ goHome, setPosts, posts }) => {
  const { userId, getToken } = useAuth();
  const { user } = useUser();
  const { categories, fetchCategories, loading, error } = useBlogStore();
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    category: "",
    readTime: "",
    tags: "",
    image: "",
  });
  // const navigate = useNavigate("");

  // Jodit editor configuration
  const config = {
    readonly: false,
    placeholder: "Start writing your blog post content here...",
    height: 400,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    buttons: [
      "undo",
      "redo",
      "|",
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "superscript",
      "subscript",
      "|",
      "align",
      "|",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "link",
      "table",
      "|",
      "hr",
      "eraser",
      "copyformat",
      "|",
      "fullsize",
      "selectall",
      "print",
      "|",
      "source",
      "|",
    ],
    uploader: {
      insertImageAsBase64URI: true,
    },
    removeButtons: ["about"],
    showPlaceholder: true,
    style: {
      font_size: "16px",
      font_family:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    },
  };

  const handleFormChange = (field, value) => {
    setBlogForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContentChange = (content) => {
    setBlogForm((prev) => ({
      ...prev,
      content: content,
    }));
  };

  // Function to strip HTML and get plain text excerpt
  const stripHtml = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const handleCreateBlog = async () => {
    const token = await getToken(); // Clerk JWT Token
    const plainTextContent = stripHtml(blogForm.content);

    if (!blogForm.title || !plainTextContent.trim()) {
      alert("Please fill in title and content fields");
      return;
    }

    const newPost = {
      title: blogForm.title,

      category: blogForm.category,
      readTime: blogForm.readTime,
      image: blogForm.image,
      tags: blogForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      content: blogForm.content, // Store HTML content
      author: userId,
      authorName:
        user?.fullName || `${user?.firstName} ${user?.lastName}` || "Anonymous",
      authorImage: user?.profileImageUrl || user?.imageUrl || "",
    };

    try {
      const res = await axios.post("http://localhost:5000/api/blogs", newPost, {
        headers: {
          Authorization: `Bearer ${token}`, // token bhejna zaroori hai
        },
      });

      if (res.status === 201) {
        alert(res.data.message || "Blog created successfully! ✅");
        // setPosts((prev) => [newPost, ...prev]);
        setBlogForm({
          title: "",
          content: "",
          category: "Technology",
          readTime: "",
          tags: "",
          image: "",
        });
      } else {
        alert("Something went wrong while creating blog ❌");
      }

      console.log("API response:", res.data);
    } catch (error) {
      console.error("Error creating blog:", error);
      alert(error.response?.data?.message || "Failed to create blog ❌");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Add this useEffect to set default category when categories load
  useEffect(() => {
    if (categories.length > 0 && !blogForm.category) {
      setBlogForm((prev) => ({
        ...prev,
        category: categories[0]._id, // Set to first category's ID
      }));
    }
  }, [categories, blogForm.category]);

  return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Create New Blog Post
          </h1>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={blogForm.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-lg"
                placeholder="Enter your blog title..."
              />
            </div>

            {/* Category and Read Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={blogForm.category}
                  onChange={(e) => handleFormChange("category", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  value={blogForm.readTime}
                  onChange={(e) => handleFormChange("readTime", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="e.g., 5 min read"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image URL
              </label>
              <input
                type="url"
                value={blogForm.image}
                onChange={(e) => handleFormChange("image", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              {blogForm.image && (
                <div className="mt-3">
                  <img
                    src={blogForm.image}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={blogForm.tags}
                onChange={(e) => handleFormChange("tags", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Enter tags separated by commas (e.g., React, JavaScript, WebDev)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate tags with commas
              </p>
            </div>

            {/* Jodit Rich Text Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <JoditEditor
                  value={blogForm.content}
                  config={config}
                  tabIndex={1}
                  onBlur={(newContent) => handleContentChange(newContent)}
                  onChange={() => {}}
                />
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <p>
                  Use the rich text editor above to format your content. You
                  can:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs mt-1">
                  <li>Format text (bold, italic, underline, colors)</li>
                  <li>Add headings, lists, and quotes</li>
                  <li>Insert images, links, and tables</li>
                  <li>Use the source button to edit HTML directly</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleCreateBlog}
                className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Publish Blog Post
              </button>
              <Link
                to="/"
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
  

      {/* Custom CSS for Jodit Editor */}
      <style>
        {`
          .jodit-workplace {
            border-radius: 0.5rem;
          }
          
          .jodit-toolbar {
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
            border: 1px solid #d1d5db;
          }
          
          .jodit-wysiwyg {
            border-bottom-left-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
            border: 1px solid #d1d5db;
            border-top: none;
            min-height: 400px;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          }
          
          .jodit-status-bar {
            border-bottom-left-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
            background: #f9fafb;
            border: 1px solid #d1d5db;
            border-top: none;
          }
          
          .jodit-toolbar__box {
            background: #f9fafb;
          }
          
          .jodit-toolbar-button {
            transition: all 0.2s;
          }
          
          .jodit-toolbar-button:hover {
            background: #e5e7eb;
          }
        `}
      </style>
    </div>
  );
};

export default CreateBlog;
