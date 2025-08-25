// components/BlogDetail/BlogDetail.js
import React from "react";

const BlogDetail = ({ selectedPost, posts, openPost }) => {
  console.log("i got my selected blog", selectedPost);
  return (
    <>
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
          {/* Content rendering */}
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
              } else if (paragraph.includes("1.") || paragraph.includes("2.")) {
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
            {/* Social buttons */}
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
    </>
  );
};

export default BlogDetail;
