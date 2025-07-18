import React, { useState } from "react";
import { useLoaderData } from "react-router";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SinglePost = () => {
  const axiosSecure = useAxiosSecure();
  const postData = useLoaderData();
  const { user } = useAuth();

  const [post, setPost] = useState(postData);
  const [feedbacks, setFeedbacks] = useState({});
  const [replies, setReplies] = useState({});
  const [loadingReplies, setLoadingReplies] = useState({});

  const handleFeedbackChange = (idx, value) => {
    setFeedbacks((prev) => ({ ...prev, [idx]: value }));
  };

  const handleReplyChange = (idx, value) => {
    setReplies((prev) => ({ ...prev, [idx]: value }));
  };

  const handleReplySubmit = async (idx) => {
    const replyText = replies[idx];
    if (!replyText) return;

    try {
      setLoadingReplies((prev) => ({ ...prev, [idx]: true }));

      await axiosSecure.post(`/posts/${post._id}/comment`, {
        replyToIndex: idx,
        replyText,
        name: user.displayName,
        email: user.email,
      });

      const updatedPost = { ...post };
      updatedPost.comments[idx].reply = {
        text: replyText,
        name: user.displayName,
        email: user.email,
        createdAt: new Date().toISOString(),
      };
      setPost(updatedPost);
      setReplies((prev) => ({ ...prev, [idx]: "" }));
    } catch (err) {
      console.error("Reply failed", err);
      alert("Failed to send reply.");
    } finally {
      setLoadingReplies((prev) => ({ ...prev, [idx]: false }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
      <h1 className="text-2xl font-bold mb-4">{post.postTitle}</h1>
      <p className="text-gray-700 mb-4">{post.postDescription}</p>

      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>Author: {post.author?.name}</span>
        <span>Date: {new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="flex space-x-4 mb-6">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
          👍 Upvotes: {post.upVote}
        </span>
        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
          👎 Downvotes: {post.downVote}
        </span>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        {post.comments?.length > 0 ? (
          <ul className="space-y-4">
            {post.comments.map((comment, idx) => (
              <li
                key={idx}
                className="bg-amber-100 p-4 rounded-lg flex flex-col gap-2"
              >
                <div>
                  <p className="font-semibold ">
                    {comment.name}
                    {comment.email === post.author?.email && (
                      <span className="ml-2 text-blue-600 text-xs">
                        (Author)
                      </span>
                    )}
                  </p>
                  {console.log(comment)}
                  {comment.email === post.author?.email && (
                    <p className="text-sm text-gray-600">{comment.email}</p>
                  )}

                  <p>{comment.commentText}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>

                {comment.reply && (
                  <div className="ml-4 mt-2 p-2 border-l-4 border-blue-400 bg-blue-50 rounded">
                    <p className="font-semibold text-xs text-blue-700">
                      Reply from Author:
                    </p>

                    <p className="text-sm">{comment.reply.text}</p>
                    <p className="text-[10px] text-gray-500">
                      {new Date(comment.reply.createdAt).toLocaleString()}
                    </p>
                  </div>
                )}

                {user?.email === post.author?.email && !comment.reply && (
                  <div className="mt-3">
                    <textarea
                      placeholder="Write a reply..."
                      value={replies[idx] || ""}
                      onChange={(e) => handleReplyChange(idx, e.target.value)}
                      className="w-full p-2 border rounded-md text-sm"
                    />
                    <button
                      disabled={loadingReplies[idx]}
                      onClick={() => handleReplySubmit(idx)}
                      className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                    >
                      {loadingReplies[idx] ? "Sending..." : "Send Reply"}
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-2">
                  <select
                    className="border rounded px-2 py-1 text-sm bg-white"
                    onChange={(e) => handleFeedbackChange(idx, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Feedback
                    </option>
                    <option value="Helpful">Helpful</option>
                    <option value="Spam">Spam</option>
                    <option value="Offensive">Offensive</option>
                  </select>

                  <button
                    disabled={!feedbacks[idx]}
                    className={`px-3 py-1 rounded-3xl text-white text-sm ${
                      feedbacks[idx]
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Report
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
