import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import axios from "axios";

const MyPost = () => {
  const loadedPosts = useLoaderData();
  const [posts, setPosts] = useState(loadedPosts);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete post.");
    }
  };

  return (
    <div>
      <table className="w-full lg:w-2/3 mx-auto my-10 lato divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-1 lg:px-6 py-3 font-bold text-left text-[10px] lg:text-xl text-black uppercase tracking-wider">
              Title
            </th>
            <th className="px-1 lg:px-6 text-center text-[10px] lg:text-[18px] font-bold text-black uppercase tracking-wider">
              Up Vote
            </th>
            <th className="px-1 lg:px-6 text-center text-[10px] lg:text-[18px] font-bold text-black uppercase tracking-wider">
              Down Vote
            </th>
            <th className="px-1 lg:px-6 text-center text-[10px] lg:text-xl font-bold text-black uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post._id}>
              <td className="px-1 lg:px-6 py-4 whitespace-nowrap">
                <div className="text-[6px] lg:text-xl text-gray-900">
                  {post.postTitle}
                </div>
              </td>
              <td className="px-1 lg:px-6 text-center whitespace-nowrap">
                <span className="px-2 inline-flex text-[6px] lg:text-xl leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {post.upVote}
                </span>
              </td>
              <td className="px-1 lg:px-6 text-center whitespace-nowrap">
                <span className="px-2 inline-flex text-[6px] lg:text-xl leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  {post.downVote}
                </span>
              </td>
              <td className="px-1 lg:px-6 text-center whitespace-nowrap text-[6px] lg:text-xl font-medium">
                <Link
                  to={`/dashboard/post/${post._id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Comments
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="ml-2 text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPost;
