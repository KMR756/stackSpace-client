import React from "react";
import { FaArrowUp, FaArrowDown, FaComment, FaClock } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const AllPost = ({ post }) => {
  // Calculate vote difference

  return (
    <div className="bg-white  my-7 w-4/5 mx-auto rounded-lg shadow-md overflow-hidden mb-6 transition-all hover:shadow-lg">
      {/* Post Header with Author Info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <img
            src={post.authorImage}
            alt={post.authorName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{post.authorName}</h3>
            <p className="text-xs text-gray-500 flex items-center">
              <FaClock className="mr-1" />
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-900">{post.postTitle}</h2>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {post.tag?.label}
          </span>
        </div>
      </div>

      {/* Post Footer with Voting and Comments */}
      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Upvote Button */}
          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
            <FaArrowUp />
            <span>{post.upVote}</span>
          </button>

          {/* Vote Difference Display */}

          {/* Downvote Button */}
          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600">
            <FaArrowDown />
            <span>{post.downVote}</span>
          </button>
        </div>

        {/* Comments */}
        <div className="flex items-center text-gray-500">
          <FaComment className="mr-1" />
          <span>{post.commentCount || 0} comments</span>
        </div>
      </div>
    </div>
  );
};

export default AllPost;
