// pages/Home.js
import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import CategoryFilter from "../components/CategoryFilter";
import BlogCard from "../components/BlogCard";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Home = ({
  featuredPost,
  categories,
  activeCategory,
  setActiveCategory,
  filteredPosts,
  openPost,
  goToCreateBlog,
  mobileMenuOpen,
  setMobileMenuOpen,
  goHome,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        goHome={goHome}
        goToCreateBlog={goToCreateBlog}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <HeroSection featuredPost={featuredPost} openPost={openPost} />

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} openPost={openPost} />
          ))}
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
