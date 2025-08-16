import React from "react";
import { Link, NavLink, useParams } from "react-router";

import { IoNotificationsOutline } from "react-icons/io5";
import Logo from "../Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import DropDown from "./DropDown";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// 🔹 API call to fetch user data
const fetchUserData = async (email) => {
  const { data } = await axios.get(
    `https://stack-space-server.vercel.app/users/${email}`
  );
  return data;
};

const Navbar = () => {
  const { user } = useAuth();
  const { uid } = useParams();
  // 🔹 Fetch user data with React Query
  const { data: userData } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () => fetchUserData(user.email),
    enabled: !!user?.email,
  });

  // 🔹 Common nav link style
  const linkStyle = ({ isActive }) =>
    isActive
      ? "lato btn btn-neutral text-sm lg:text-xl text-text"
      : "lato btn btn-neutral btn-outline text-sm lg:text-xl text-text";

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={linkStyle}>
          Home
        </NavLink>
      </li>

      {/* Hide Membership for Admins */}
      {userData?.role !== "admin" && (
        <li>
          <NavLink
            to={`/dashboard/membership/${user?.email}`}
            className={linkStyle}
          >
            Membership
          </NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink
            to={"/dashboard/user-dashboard"} // ✅ use user.email directly
            className={linkStyle}
          >
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/about" className={linkStyle}>
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar w-full bg-Primary lg:px-10">
      {/* Left side: Logo + Mobile menu */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden px-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-navFooter gap-3 items-center rounded-box z-10 mt-3 p-2 shadow space-x-4"
          >
            {navItems}
          </ul>
        </div>

        <Logo />
      </div>

      {/* Center: Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-6">{navItems}</ul>
      </div>

      {/* Right side: Notifications + Auth */}
      <div className="navbar-end">
        {user ? (
          <DropDown />
        ) : (
          <Link to="/auth/registration">
            <button className="lato font-semibold relative inline-flex items-center justify-center overflow-hidden text-[10px] lg:text-xl text-Text rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 hover:text-white">
              <span className="relative px-2 lg:px-5 py-1 lg:py-2.5 transition-all ease-in duration-75 bg-Secondary rounded-md hover:bg-[#c0293f]">
                Join Us
              </span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
