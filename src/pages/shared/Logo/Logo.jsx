import React from "react";
import logo from "../../../assets/logo.png";
const Logo = () => {
  return (
    <div className="flex gap-1 ">
      <div className="w-[20%] h-[30%]">
        <img src={logo} alt="" />
      </div>
      <div className="flex flex-col justify-end lg:mt-4">
        <p className="barlow-condensed font-black text-sm lg:text-4xl text-Text text-bold">
          <span className="lg:text-5xl">S</span>tack
          <span className="lg:text-5xl">S</span>pace
        </p>
        <p className="lato text-end font-semibold  text-white text-[10px] lg:text-xl  ">
          Tech Threads...
        </p>
      </div>
    </div>
  );
};

export default Logo;
