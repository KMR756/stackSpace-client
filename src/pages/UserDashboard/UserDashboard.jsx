import React from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

// Assets
import myProfile from "../../assets/myProfile.svg";
import addPost from "../../assets/addPost.svg";
import myPost from "../../assets/myPost.svg";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-10 text-center">
          Dashboard
        </h2>

        <nav className="flex flex-col gap-4">
          <Link
            to={`/dashboard/my-profile/${user.uid}`}
            className="py-2 px-4 rounded-lg text-gray-700 hover:bg-rose-100 hover:text-rose-600 font-semibold transition"
          >
            My Profile
          </Link>
          <Link
            to="/dashboard/add-post"
            className="py-2 px-4 rounded-lg text-gray-700 hover:bg-rose-100 hover:text-rose-600 font-semibold transition"
          >
            Add Post
          </Link>
          <Link
            to={`/dashboard/my-posts/${user.uid}`}
            className="py-2 px-4 rounded-lg text-gray-700 hover:bg-rose-100 hover:text-rose-600 font-semibold transition"
          >
            My Posts
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-12 text-center md:text-left">
          Welcome, {user.displayName}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to={`/dashboard/my-profile/${user.uid}`}>
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <img
                src={myProfile}
                alt="Profile"
                className="w-full h-60 object-cover"
              />
              <div className="p-5">
                <h3 className="text-2xl font-bold text-center group-hover:text-rose-600">
                  My Profile
                </h3>
              </div>
            </div>
          </Link>

          <Link to="/dashboard/add-post">
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <img
                src={addPost}
                alt="Add Post"
                className="w-full h-60 object-cover"
              />
              <div className="p-5">
                <h3 className="text-2xl font-bold text-center group-hover:text-rose-600">
                  Add Post
                </h3>
              </div>
            </div>
          </Link>

          <Link to={`/dashboard/my-posts/${user.uid}`}>
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <img
                src={myPost}
                alt="My Posts"
                className="w-full h-60 object-cover"
              />
              <div className="p-5">
                <h3 className="text-2xl font-bold text-center group-hover:text-rose-600">
                  My Posts
                </h3>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
