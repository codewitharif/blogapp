import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import BlogDetailPage from "./pages/BlogDetailPage";
import CreateBlogPage from "./pages/CreateBlogPage";

const App = () => {
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  // Combine posts and featuredPost for easier lookup
  const allPosts = [featuredPost, ...posts];

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                featuredPost={featuredPost}
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                filteredPosts={filteredPosts}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            }
          />
          <Route
            path="/create-blog"
            element={<CreateBlogPage setPosts={setPosts} posts={posts} />}
          />
          <Route
            path="/blog/:id"
            element={<BlogDetailPage posts={allPosts} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
