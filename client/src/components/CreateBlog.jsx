// components/CreateBlog/CreateBlog.js
import React, { useState } from "react";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";

const CreateBlog = ({ goHome, setPosts, posts }) => {
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    category: "Technology",
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

  const handleCreateBlog = () => {
    const plainTextContent = stripHtml(blogForm.content);

    if (!blogForm.title || !plainTextContent.trim()) {
      alert("Please fill in title and content fields");
      return;
    }

    const newPost = {
      id: posts.length + 2,
      title: blogForm.title,
      excerpt: plainTextContent.substring(0, 150) + "...",
      content: blogForm.content, // Store HTML content
      author: "Current User",
      authorImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      category: blogForm.category,
      image:
        blogForm.image ||
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      readTime: blogForm.readTime || "5 min read",
      likes: 0,
      comments: 0,
      tags: blogForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    setPosts((prev) => [newPost, ...prev]);
    setBlogForm({
      title: "",
      content: "",
      category: "Technology",
      readTime: "",
      tags: "",
      image: "",
    });
    goHome();
    alert("Blog post created successfully!");
  };

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
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Creativity">Creativity</option>
                <option value="Lifestyle">Lifestyle</option>
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
                Use the rich text editor above to format your content. You can:
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
