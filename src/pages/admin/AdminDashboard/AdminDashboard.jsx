import React from "react";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";

import { Link, Outlet } from "react-router";

const AdminDashboard = () => {
  return (
    <div className="w-full  lg:max-w-10/12 mx-auto ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AdminDashboard;
