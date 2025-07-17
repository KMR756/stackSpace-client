import React from "react";

import useAuth from "../../hooks/useAuth";
import { FaArrowRight, FaCheckCircle, FaCrown } from "react-icons/fa";

const GoldMemberCard = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="w-full lg:w-2/3 mx-auto my-16 p-8 rounded-3xl shadow-2xl bg-gradient-to-tr from-yellow-50 via-amber-100 to-yellow-200 border border-yellow-300 text-center">
        <div className="flex justify-center mb-6">
          <FaCrown className="text-yellow-500 text-5xl animate-bounce" />
        </div>

        <h1 className="text-4xl font-extrabold text-yellow-700 mb-3">
          Welcome to Gold Membership!
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          Congratulations{" "}
          <span className="font-semibold text-yellow-800">
            {user?.displayName}
          </span>
          , you've unlocked premium features.
        </p>

        <div className="flex flex-col items-center justify-center mb-8">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-24 h-24 rounded-full ring-4 ring-yellow-400 mb-3 shadow-md"
          />
          <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Gold Member
          </span>
        </div>

        <ul className="text-left text-gray-800 space-y-3 mb-10 max-w-md mx-auto">
          <li className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-3" />
            Post up to <strong className="ml-1">5 items at once</strong>
          </li>
          <li className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-3" />
            <strong className="ml-1">Priority placement</strong> for featured
            posts
          </li>
          <li className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-3" />
            Earn a <strong className="ml-1">Gold Badge</strong> on your profile
          </li>
          <li className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-3" />
            Support future features and community growth!
          </li>
        </ul>

        <button
          onClick={() => (window.location.href = "/dashboard/add-post")}
          className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 shadow-lg"
        >
          Start Posting <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default GoldMemberCard;
