import React from "react";
import { Link } from "react-router";

const Error = () => {
  return (
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div class="text-center animate-fadeIn">
        <img
          src="https://yemca-services.net/404.png"
          alt="404 Illustration"
          class="mx-auto w-80 animate-[float_3s_infinite] shadow-xl rounded-lg"
        ></img>
        <h1 class="text-7xl font-extrabold text-navFooter mt-6">
          Looks Like You're Lost!
        </h1>
        <p class="text-xl text-gray-700 mt-2">
          We can't seem to find the page you're looking for.
        </p>
        <Link
          to={"/"}
          class="mt-6 inline-block bg-[#8f5989]  text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-navFooter"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
