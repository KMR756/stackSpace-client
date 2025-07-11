import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";
const Logo = () => {
  return (
    <>
      <Link to={"/"}>
        {" "}
        <div className="flex gap-1 ">
          <div className="w-[20%] h-[30%]">
            <img src={logo} alt="" />
          </div>
          <div className="flex flex-col justify-end lg:mt-4">
            <p className="barlow-condensed font-black  text-2xl lg:text-4xl text-Text text-bold">
              <span className="lg:text-5xl">S</span>tack
              <span className="lg:text-5xl">S</span>pace
            </p>
            <p className="lato text-end font-semibold  text-white text-[10px] lg:text-xl  ">
              Tech Threads...
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Logo;
