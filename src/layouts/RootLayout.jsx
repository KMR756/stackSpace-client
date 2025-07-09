import React from "react";
import Navbar from "../pages/shared/Navbar/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="max-w-10/12 mx-auto ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
