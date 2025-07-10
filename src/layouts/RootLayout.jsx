import React from "react";

import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar/Navbar";
import Banner from "../pages/shared/Banner/Banner";
import Footer from "../pages/shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="w-full lg:max-w-10/12 mx-auto ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
