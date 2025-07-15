import React, { useState } from "react";
import { FaArrowUp, FaArrowDown, FaComment, FaClock } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AllPost = ({ post }) => {
  const { user } = useAuth();
  const [upVote, setUpVote] = useState(post.upVote || 0);
  const [downVote, setDownVote] = useState(post.downVote || 0);
  const [comments, setComments] = useState(post.comments || []);
  console.log(user);

  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [voted, setVoted] = useState({
    up: post.upVotedBy?.includes(user?.email) || false,
    down: post.downVotedBy?.includes(user?.email) || false,
  });

  const handleVote = async (type) => {
    if (!user?.email) return;
    const endpoint = `http://localhost:3000/posts/${post._id}/${type}`;
    try {
      await axios.patch(endpoint, { email: user.email });

      if (type === "upvote") {
        if (voted.up) {
          setUpVote((prev) => prev - 1);
          setVoted({ ...voted, up: false });
        } else {
          setUpVote((prev) => prev + 1);
          if (voted.down) setDownVote((prev) => prev - 1);
          setVoted({ up: true, down: false });
        }
      } else {
        if (voted.down) {
          setDownVote((prev) => prev - 1);
          setVoted({ ...voted, down: false });
        } else {
          setDownVote((prev) => prev + 1);
          if (voted.up) setUpVote((prev) => prev - 1);
          setVoted({ up: false, down: true });
        }
      }
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Vote error");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user?.email) return;

    try {
      await axios.post(`http://localhost:3000/posts/${post._id}/comment`, {
        name: user.displayName,
        commentText: newComment,
      });
      const comment = {
        name: user.displayName,
        commentText: newComment,
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    } catch (err) {
      setError("Failed to post comment");
    }
  };

  return (
    <div className="bg-white my-7 w-4/5 mx-auto rounded-lg shadow-md overflow-hidden">
      {/* Header */}
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

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-900">{post.postTitle}</h2>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {post.tag?.label}
          </span>
        </div>
        <p className="text-gray-700">{post.postDescription}</p>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleVote("upvote")}
            className={`flex items-center space-x-1 hover:text-green-600 ${
              voted.up ? "text-green-600" : "text-gray-500"
            }`}
          >
            <FaArrowUp />
            <span>{upVote}</span>
          </button>

          <button
            onClick={() => handleVote("downvote")}
            className={`flex items-center space-x-1 hover:text-red-600 ${
              voted.down ? "text-red-600" : "text-gray-500"
            }`}
          >
            <FaArrowDown />
            <span>{downVote}</span>
          </button>
        </div>

        <div className="flex items-center text-gray-500">
          <FaComment className="mr-1" />
          <span>{comments.length} comments</span>
        </div>
      </div>

      {/* Comments Section */}
      <div className="px-4 py-3">
        <form onSubmit={handleComment} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="2"
            placeholder="Add a comment..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring"
          ></textarea>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
          >
            Comment
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="space-y-3">
          {comments.map((comment, idx) => (
            <div key={idx} className="bg-gray-100 p-3 rounded">
              <p className="text-sm font-medium">{comment.name}</p>
              <p className="text-gray-700">{comment.commentText}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPost;
