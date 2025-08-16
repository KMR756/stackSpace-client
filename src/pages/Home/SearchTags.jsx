import React from "react";
import AnnouncementList from "../admin/MakeAnouncement/AnnouncementList";

const SearchTags = ({ posts, onTagClick, selectedTag }) => {
  const uniqueTags = Array.from(
    new Set(posts.map((post) => post.tag?.label).filter(Boolean))
  );

  return (
    <>
      <AnnouncementList />
      <div className="flex flex-wrap gap-2 justify-center my-6 ">
        {/* All Posts Button */}
        <button
          onClick={() => onTagClick("")}
          className={`text-sm px-3 py-1 rounded-full transition ${
            selectedTag === ""
              ? "bg-Primary text-white"
              : "bg-[#52225820] text-gray-700 hover:bg-gray-300"
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
                  ? "bg-Primary text-white"
                  : "bg-[#52225820] text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default SearchTags;
