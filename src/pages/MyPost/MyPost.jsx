import React from "react";
import { useLoaderData } from "react-router";

const MyPost = () => {
  const posts = useLoaderData();
  console.log(posts);

  return (
    <div>
      <table class="w-full lg:w-2/3 mx-auto my-10 lato divide-y divide-gray-200 overflow-x-auto">
        <thead class="bg-gray-50 ">
          <tr>
            <th
              scope="col"
              class="px-1 lg:px-6 py-3 font-bold text-left text-[10px] lg:text-xl  text-black uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              class="px-1 lg:px-6 text-center text-[10px] lg:text-xl  font-bold text-black uppercase tracking-wider"
            >
              Votes
            </th>

            <th
              scope="col"
              class="px-1 lg:px-6 text-center text-[10px] lg:text-xl  font-bold text-black uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y  divide-gray-200">
          {posts.map((post) => (
            <tr>
              <td class="px-1 lg:px-6 py-4 whitespace-nowrap">
                <div class="text-[6px] lg:text-xl text-gray-900">
                  {post.postTitle}
                </div>
                {console.log(post)}
              </td>
              <td class="px-1 lg:px-6 text-center whitespace-nowrap">
                <span class="px-2  inline-flex text-[6px] lg:text-xl leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {post.upVote}
                </span>
              </td>

              <td class="px-1 lg:px-6 text-center whitespace-nowrap  text-[6px] lg:text-xl font-medium">
                <a href="#" class="text-indigo-600 hover:text-indigo-900">
                  Comments
                </a>
                <a href="#" class="ml-2 text-red-600 hover:text-red-900">
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPost;
