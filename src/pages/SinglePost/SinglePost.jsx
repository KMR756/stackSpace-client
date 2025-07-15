import React from "react";
import { useLoaderData } from "react-router";

const SinglePost = () => {
  const post = useLoaderData();
  console.log(post);

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
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {post.comments && post.comments.length > 0 ? (
          <ul className="space-y-2">
            {post.comments.map((comment, idx) => (
              <li
                key={idx}
                className="border-transparent px-5 bg-amber-100 flex justify-between  p-3 rounded-lg  text-gray-800"
              >
                <div>
                  <p className="lato font-semibold">{comment.name}</p>
                  <p className="lato">{comment.commentText}</p>
                  <p className="lato text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="lato border-transparent py-1 px-2 rounded-3xl bg-navFooter text-white">
                    Feedback
                  </button>
                  <button className="lato border-transparent py-1 px-2 rounded-3xl bg-navFooter text-white">
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
