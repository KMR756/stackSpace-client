import { useLoaderData } from "react-router";
import { FaArrowUp, FaArrowDown, FaComment, FaClock } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const posts = useLoaderData();
  const { user } = useAuth();

  // ✅ Fetch user data with TanStack Query
  const { data: userData } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // only run if email exists
  });

  // ✅ Sort posts and take first 3
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="w-full lg:w-2/3 mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-5xl text-center text-navFooter font-bold mb-6">
        My Profile
      </h2>

      {/* Profile Info */}
      <div className="flex flex-col items-center p-10 rounded-3xl bg-amber-100 md:mx-20 lg:mx-30 xl:mx-60">
        <img
          className="w-20 h-20 object-cover rounded-full"
          src={user.photoURL}
          alt={user.displayName}
        />
        <h1 className="lato font-bold mt-3 text-xl">{user.displayName}</h1>
        <h1 className="lato mt-2">{user.email}</h1>
        <p className="lato bg-blue-400 text-white font-semibold px-2 py-1 rounded-2xl mt-2">
          {userData?.membership ? "Gold" : "Bronze"}
        </p>
      </div>

      {/* Recent Posts */}
      {recentPosts.length === 0 ? (
        <p className="text-center text-navFooter text-2xl my-10">
          You haven't posted anything yet.
        </p>
      ) : (
        recentPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white my-7 w-4/5 mx-auto rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="p-4">
              <div className="flex flex-col lg:flex-row justify-between items-start mb-2">
                <h2 className="text-sm lg:text-xl font-bold text-gray-900">
                  {post.postTitle}
                </h2>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {post.tag?.label}
                </span>
              </div>
              <p className="lato text-xs lg:text-xl">{post.postDescription}</p>
              <p className="text-xs text-gray-500 flex items-center">
                <FaClock className="mr-1" />
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>

            {/* Post Footer */}
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-500">
                  <FaArrowUp />
                  <span>{post.upVote}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500">
                  <FaArrowDown />
                  <span>{post.downVote}</span>
                </button>
              </div>
              <div className="flex items-center text-gray-500">
                <FaComment className="mr-1" />
                <span>{post.commentCount || 0} comments</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyProfile;
