import React from "react";
import logo from "../../../assets/logo.png";
const Logo = () => {
  return (
    <div className="flex gap-4">
      <div className="w-[30%] h-[30%]">
        <img src={logo} alt="" />
      </div>
      <div className="flex flex-col justify-end mb-3">
        <p className="text-5xl text-bold">StackSpace</p>
        <p className="text-end text-xl mt-2">Tech Threads</p>
      </div>
    </div>
  );
};

export default Logo;
