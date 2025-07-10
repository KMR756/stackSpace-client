import React from "react";
import { Typewriter } from "react-simple-typewriter";
import banner2 from "../../../assets/banner2.jpg"; // Replace with your image path

import FloatingIcons from "./FloatingIcons";

// Floating Icons

const Banner = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <img
        src={banner2}
        alt="Banner"
        className="absolute inset-0  w-full h-full object-cover z-0"
      />

      {/* Floating Icons */}
      <FloatingIcons />

      {/* Search Form - Top Right */}
      <div className="absolute top-6 right-30 z-10">
        <form className="w-3/2 ">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
                bg-gray-50"
              placeholder="Search the forum..."
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-navFooter hover:bg-blue-800 
                 font-medium rounded-lg 
                text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Typewriter Text - Bottom Left */}
      <div className="absolute bottom-10 left-6 z-10">
        <h2 className="lato text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-md">
          <Typewriter
            words={[
              "Ask Questions. Get Answers.",
              "Join the Tech Conversation.",
              "Share Knowledge. Learn Together.",
              "Build. Break. Debug. Repeat.",
              "Where Coders Connect.",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>
      </div>
    </div>
  );
};

export default Banner;
