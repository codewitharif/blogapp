// pages/Home.js
import React, { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import CategoryFilter from "../components/CategoryFilter";
import BlogCard from "../components/BlogCard";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";
import useBlogStore from "../store/store";

const Home = () => {
  const { featuredPost, getFilteredBlogs, getFormattedCategories } =
    useBlogStore();

  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get data from store
  const filteredPosts = getFilteredBlogs(activeCategory);
  const formattedCategories = getFormattedCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <HeroSection />

      <CategoryFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={formattedCategories}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.slice(0, 3).map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
