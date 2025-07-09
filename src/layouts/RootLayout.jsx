import React from "react";

import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar/Navbar";
import Banner from "../pages/shared/Banner/Banner";

const RootLayout = () => {
  return (
    <div className="w-full lg:max-w-10/12 mx-auto ">
      <Navbar />
      <Banner />
      <Outlet />
    </div>
  );
};

export default RootLayout;
