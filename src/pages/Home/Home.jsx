import React, { useState } from "react";
import Banner from "../shared/Banner/Banner";
import { useLoaderData } from "react-router";
import AllPost from "./AllPost";
import SearchTags from "./SearchTags";

const POSTS_PER_PAGE = 5;

const Home = () => {
  const posts = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedTag("");
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    setSelectedTag(tag);
    setCurrentPage(1); // Reset to page 1 on tag click
  };

  const filteredPosts = posts
    .filter((post) => {
      if (!searchQuery) return true;
      const tag = post.tag?.label?.toLowerCase() || "";
      return tag.includes(searchQuery);
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div>
      <Banner onSearch={handleSearch} />
      <SearchTags
        posts={posts}
        onTagClick={handleTagClick}
        selectedTag={selectedTag}
      />

      {/* Posts */}
      {paginatedPosts.length > 0 ? (
        paginatedPosts.map((post) => <AllPost key={post._id} post={post} />)
      ) : (
        <p className="text-center mt-10 text-gray-600 text-lg">
          No posts found.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center my-8 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 text-sm rounded-md border ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 hover:bg-blue-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
