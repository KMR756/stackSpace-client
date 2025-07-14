import React from "react";

const SearchTags = ({ posts, onTagClick, selectedTag }) => {
  const uniqueTags = Array.from(
    new Set(posts.map((post) => post.tag?.label).filter(Boolean))
  );

  return (
    <div className="flex flex-wrap gap-2 justify-center my-6">
      {/* All Posts Button */}
      <button
        onClick={() => onTagClick("")}
        className={`text-sm px-3 py-1 rounded-full transition ${
          selectedTag === ""
            ? "bg-blue-800 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        All Posts
      </button>

      {/* Individual Tags */}
      {uniqueTags.map((tag) => {
        const isSelected = selectedTag === tag.toLowerCase();
        return (
          <button
            key={tag}
            onClick={() => onTagClick(tag.toLowerCase())}
            className={`text-sm px-3 py-1 rounded-full transition ${
              isSelected
                ? "bg-blue-800 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
};

export default SearchTags;
