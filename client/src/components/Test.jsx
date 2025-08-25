import React, { useState } from "react";

const BlogApp = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt:
        "Exploring the latest trends and technologies that are shaping the future of web development.",
      content: `Web development continues to evolve at a rapid pace. With the introduction of new frameworks, tools, and methodologies, developers are able to create more sophisticated and performant applications than ever before.

In this comprehensive guide, we'll explore the key trends that are shaping the future of web development, from AI-powered development tools to the rise of edge computing and serverless architectures.

## The Rise of AI in Development

Artificial Intelligence is revolutionizing how we write code. Tools like GitHub Copilot and ChatGPT are becoming essential parts of the developer toolkit, offering intelligent code suggestions and automated problem-solving capabilities.

## Edge Computing and Performance

The shift towards edge computing is fundamentally changing how we think about web performance. By processing data closer to users, we can achieve unprecedented speeds and responsiveness.

## The Future is Bright

As we look ahead, the possibilities are endless. Web development is becoming more accessible, more powerful, and more exciting than ever before. The tools we have today would have seemed like magic just a few years ago.`,
      author: "Jane Smith",
      authorImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      date: "May 15, 2023",
      category: "Technology",
      image:
        "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      readTime: "5 min read",
      likes: 142,
      comments: 23,
      tags: ["React", "JavaScript", "WebDev", "Future"],
    },
    {
      id: 2,
      title: "Minimalist Design Principles",
      excerpt:
        "How simplicity and minimalism can create more effective and beautiful user interfaces.",
      content: `Minimalism in design isn't just an aesthetic choice—it's a philosophy that emphasizes simplicity and functionality. By stripping away unnecessary elements, minimalist design focuses on what's essential, creating interfaces that are both beautiful and intuitive.

## The Power of Less

In our cluttered digital world, minimalism offers a breath of fresh air. It's about making every element count and ensuring that each design decision serves a purpose.

## Key Principles

1. **Simplicity**: Remove everything that doesn't add value
2. **Whitespace**: Use negative space to create breathing room
3. **Typography**: Choose fonts that communicate clearly
4. **Color**: Use a limited palette for maximum impact

## Real-World Applications

From Apple's clean product pages to Google's search interface, minimalism has proven its effectiveness across industries and use cases.`,
      author: "Michael Chen",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      date: "April 28, 2023",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      readTime: "4 min read",
      likes: 89,
      comments: 15,
      tags: ["Design", "UI/UX", "Minimalism"],
    },
    {
      id: 3,
      title: "Building a Personal Brand",
      excerpt:
        "Strategies for developing a strong personal brand in the digital age.",
      content: `In today's competitive landscape, a strong personal brand can be your greatest asset. Whether you're an entrepreneur, freelancer, or corporate professional, how you present yourself online can open doors to new opportunities.

## Why Personal Branding Matters

Your personal brand is what people say about you when you're not in the room. It's the perception others have of your skills, values, and personality.

## Building Your Foundation

Start with self-reflection. What are your unique strengths? What value do you bring to others? What do you want to be known for?

## Digital Presence

In our connected world, your online presence is often the first impression you make. Make it count with consistent messaging across all platforms.

## Authenticity is Key

The most powerful personal brands are built on authenticity. Don't try to be someone you're not—instead, be the best version of yourself.`,
      author: "Sarah Johnson",
      authorImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      date: "April 15, 2023",
      category: "Business",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80",
      readTime: "7 min read",
      likes: 256,
      comments: 41,
      tags: ["Branding", "Business", "Career"],
    },
  ]);

  const [featuredPost] = useState({
    id: 0,
    title: "The Art of Creative Thinking",
    excerpt:
      "Unlocking your creative potential and applying innovative thinking to solve complex problems.",
    content: `Creative thinking isn't a talent reserved for artists and designers—it's a skill that can be developed and applied across all disciplines. By understanding the principles of creative thinking and practicing specific techniques, you can enhance your problem-solving abilities and generate innovative solutions.

## The Science Behind Creativity

Recent neuroscience research has revealed fascinating insights about how our brains generate creative ideas. The creative process involves complex interactions between different brain networks.

## Techniques for Enhanced Creativity

1. **Divergent Thinking**: Generate multiple solutions to a single problem
2. **Mind Mapping**: Visualize connections between ideas
3. **The SCAMPER Method**: Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse

## Creating the Right Environment

Your physical and mental environment plays a crucial role in fostering creativity. Learn how to optimize your workspace for maximum creative output.`,
    author: "David Wilson",
    authorImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    date: "June 2, 2023",
    category: "Creativity",
    image:
      "https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
    readTime: "10 min read",
    likes: 198,
    comments: 34,
    tags: ["Creativity", "Innovation", "Problem Solving"],
  });

  const categories = [
    "All",
    "Technology",
    "Design",
    "Business",
    "Creativity",
    "Lifestyle",
  ];
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentView, setCurrentView] = useState("home");
  const [selectedPost, setSelectedPost] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Create blog state
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    category: "Technology",
    readTime: "",
    tags: "",
    image: "",
  });

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const openPost = (post) => {
    setSelectedPost(post);
    setCurrentView("detail");
  };

  const goHome = () => {
    setCurrentView("home");
    setSelectedPost(null);
  };

  const goToCreateBlog = () => {
    setCurrentView("create");
    setSelectedPost(null);
  };

  const handleFormChange = (field, value) => {
    setBlogForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateBlog = () => {
    if (!blogForm.title || !blogForm.content) {
      alert("Please fill in title and content fields");
      return;
    }

    const newPost = {
      id: posts.length + 2,
      title: blogForm.title,
      excerpt: blogForm.content.substring(0, 150) + "...",
      content: blogForm.content,
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
    setCurrentView("home");
    alert("Blog post created successfully!");
  };

  // CREATE BLOG PAGE
  if (currentView === "create") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={goHome}
                  className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
                >
                  BlogHub
                </button>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-6">
                <button
                  onClick={goHome}
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
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Create Blog Form */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
                    onChange={(e) =>
                      handleFormChange("category", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleFormChange("readTime", e.target.value)
                    }
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

              {/* Content - Rich Text Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  {/* Toolbar */}
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-300">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const textarea =
                            document.getElementById("content-textarea");
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const selectedText = textarea.value.substring(
                            start,
                            end
                          );
                          const newText =
                            textarea.value.substring(0, start) +
                            "**" +
                            selectedText +
                            "**" +
                            textarea.value.substring(end);
                          handleFormChange("content", newText);
                        }}
                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                      >
                        <strong>B</strong>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const textarea =
                            document.getElementById("content-textarea");
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const selectedText = textarea.value.substring(
                            start,
                            end
                          );
                          const newText =
                            textarea.value.substring(0, start) +
                            "*" +
                            selectedText +
                            "*" +
                            textarea.value.substring(end);
                          handleFormChange("content", newText);
                        }}
                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors italic"
                      >
                        I
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const newContent =
                            blogForm.content + "\n\n## Heading\n\n";
                          handleFormChange("content", newContent);
                        }}
                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const newContent =
                            blogForm.content +
                            "\n\n- List item\n- List item\n\n";
                          handleFormChange("content", newContent);
                        }}
                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                      >
                        List
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const newContent =
                            blogForm.content +
                            "\n\n[Link text](https://example.com)\n\n";
                          handleFormChange("content", newContent);
                        }}
                        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                      >
                        Link
                      </button>
                    </div>
                  </div>

                  {/* Text Area */}
                  <textarea
                    id="content-textarea"
                    value={blogForm.content}
                    onChange={(e) =>
                      handleFormChange("content", e.target.value)
                    }
                    rows={15}
                    className="w-full px-4 py-3 border-0 focus:ring-0 resize-none"
                    placeholder="Start writing your blog post content here... You can use Markdown formatting."
                  />
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Formatting tips:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>**bold text** or *italic text*</li>
                    <li>## for headings</li>
                    <li>- for bullet points</li>
                    <li>[Link text](URL) for links</li>
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
                <button
                  onClick={goHome}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "detail" && selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={goHome}
                  className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
                >
                  BlogHub
                </button>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-6">
                <button
                  onClick={goHome}
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
                </button>
                <button className="bg-gray-900 text-white px-3 sm:px-6 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm sm:text-base">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Article Header */}
        <div className="relative">
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-3 sm:mb-4">
                <span className="inline-block px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full">
                  {selectedPost.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {selectedPost.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-3 sm:space-y-0 text-white/90">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedPost.authorImage}
                    alt={selectedPost.author}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/30"
                  />
                  <div>
                    <p className="font-semibold text-white text-sm sm:text-base">
                      {selectedPost.author}
                    </p>
                    <p className="text-xs sm:text-sm text-white/80">
                      {selectedPost.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-xs sm:text-sm text-white/80">
                  <span>{selectedPost.readTime}</span>
                  <span>❤️ {selectedPost.likes}</span>
                  <span>💬 {selectedPost.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-200">
            <div className="prose prose-sm sm:prose-lg max-w-none">
              {selectedPost.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("##")) {
                  return (
                    <h2
                      key={index}
                      className="text-xl sm:text-2xl font-bold text-gray-900 mt-6 sm:mt-8 mb-3 sm:mb-4"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                } else if (
                  paragraph.includes("1.") ||
                  paragraph.includes("2.")
                ) {
                  const lines = paragraph.split("\n");
                  return (
                    <div key={index} className="my-4 sm:my-6">
                      {lines.map((line, lineIndex) => (
                        <div
                          key={lineIndex}
                          className="mb-2 text-gray-700 text-sm sm:text-base"
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  );
                } else {
                  return (
                    <p
                      key={index}
                      className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base"
                    >
                      {paragraph}
                    </p>
                  );
                }
              })}
            </div>

            {/* Tags */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Actions */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 bg-gray-50 rounded-xl space-y-4 sm:space-y-0">
              <div className="flex items-center justify-center sm:justify-start space-x-4 sm:space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                  <span className="text-lg sm:text-xl">❤️</span>
                  <span className="text-sm sm:text-base">
                    {selectedPost.likes}
                  </span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <span className="text-lg sm:text-xl">💬</span>
                  <span className="text-sm sm:text-base">
                    {selectedPost.comments}
                  </span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                  <span className="text-lg sm:text-xl">🔗</span>
                  <span className="text-sm sm:text-base">Share</span>
                </button>
              </div>
              <button className="bg-gray-900 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm sm:text-base">
                Follow Author
              </button>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-12 sm:mt-16">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
              More Articles
            </h3>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {posts
                .filter((p) => p.id !== selectedPost.id)
                .slice(0, 2)
                .map((post) => (
                  <div
                    key={post.id}
                    onClick={() => openPost(post)}
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-32 sm:h-48 object-cover"
                    />
                    <div className="p-4 sm:p-6">
                      <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                      <h4 className="mt-2 sm:mt-3 text-base sm:text-lg font-semibold text-gray-900">
                        {post.title}
                      </h4>
                      <p className="mt-1 sm:mt-2 text-gray-600 text-xs sm:text-sm">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20">
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors cursor-pointer">
                BlogHub
              </span>
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
              <button
                onClick={goToCreateBlog}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Write
              </button>
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
              <button className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                <a
                  href="#"
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  Home
                </a>
                <button
                  onClick={goToCreateBlog}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  Write
                </button>
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
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500">
          <div className="flex flex-col md:flex-row">
            <div className="md:flex-shrink-0 md:w-1/2 relative overflow-hidden">
              <img
                className="h-64 sm:h-80 md:h-full w-full object-cover transform hover:scale-105 transition-transform duration-700"
                src={featuredPost.image}
                alt={featuredPost.title}
              />
            </div>
            <div className="p-6 sm:p-8 lg:p-12 md:w-1/2 flex flex-col justify-center">
              <div className="inline-block">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium rounded-full">
                  {featuredPost.category}
                </span>
              </div>
              <h1 className="mt-4 sm:mt-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {featuredPost.title}
              </h1>
              <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center">
                <div className="flex items-center">
                  <img
                    src={featuredPost.authorImage}
                    alt={featuredPost.author}
                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-full"
                  />
                  <div className="ml-3 sm:ml-4">
                    <p className="text-base sm:text-lg font-medium text-gray-900">
                      {featuredPost.author}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-500 text-sm">
                      <span>{featuredPost.date}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{featuredPost.readTime}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>❤️ {featuredPost.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => openPost(featuredPost)}
                className="mt-6 sm:mt-8 inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-base sm:text-lg font-medium"
              >
                Read Full Article
                <svg
                  className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => openPost(post)}
              className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500 cursor-pointer hover:scale-105 border border-gray-200"
            >
              <div className="relative overflow-hidden">
                <img
                  className="h-48 sm:h-56 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={post.image}
                  alt={post.title}
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className="px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black/50 text-white text-xs sm:text-sm px-2 py-1 rounded">
                  {post.readTime}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 sm:mt-3 text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-center">
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                    />
                    <div className="ml-2 sm:ml-3">
                      <p className="text-xs sm:text-sm font-medium text-gray-900">
                        {post.author}
                      </p>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-500">
                    <span className="flex items-center">❤️ {post.likes}</span>
                    <span className="flex items-center">
                      💬 {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Stay Updated</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of readers who get fresh perspectives and
            cutting-edge insights delivered weekly.
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">BlogHub</h3>
              <p className="text-gray-600 leading-relaxed">
                Sharing ideas, insights, and inspiration across various topics.
                Join our community of curious minds.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">
                Categories
              </h4>
              <ul className="space-y-3">
                {["Technology", "Design", "Business", "Lifestyle"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">
                Company
              </h4>
              <ul className="space-y-3">
                {["About", "Careers", "Privacy Policy", "Terms"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">
                Connect
              </h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300"
                  title="Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>

                <a
                  href="#"
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300"
                  title="Instagram"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                <a
                  href="#"
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300"
                  title="LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2023 BlogHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogApp;
