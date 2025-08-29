// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetailPage from "./pages/BlogDetailPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import MoreBlogsPage from "./pages/MoreBlogsPage";
import useBlogStore from "./store/store";

const App = () => {
  const { fetchBlogs, fetchCategories } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [fetchBlogs, fetchCategories]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-blog" element={<CreateBlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/blogs" element={<MoreBlogsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
