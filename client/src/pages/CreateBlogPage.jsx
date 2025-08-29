// pages/CreateBlogPage.js
import React from "react";
import Header from "../components/Header";
import CreateBlog from "../components/CreateBlog";
import BackHeader from "../components/BackHeader";

const CreateBlogPage = ({ goHome, setPosts, posts }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header goHome={goHome} currentView="create" /> */}

      <BackHeader goHome={goHome} currentView="create"/>
      <CreateBlog goHome={goHome} setPosts={setPosts} posts={posts} />
    </div>
  );
};

export default CreateBlogPage;
