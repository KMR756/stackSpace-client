import React from "react";
import { Link, NavLink } from "react-router"; // ✅ use react-router-dom
import { IoNotificationsOutline } from "react-icons/io5";
import Logo from "../Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import DropDown from "./DropDown";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchUserData = async (email) => {
  const { data } = await axios.get(
    `https://stack-space-server.vercel.app/users/${email}`
  );
  return data;
};

const Navbar = () => {
  const { user } = useAuth();

  // ✅ use TanStack Query instead of useEffect
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () => fetchUserData(user.email),
    enabled: !!user?.email, // only run if user email exists
  });

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "lato btn btn-neutral text-sm lg:text-xl text-text"
              : "lato btn btn-neutral btn-outline text-sm lg:text-xl text-text"
          }
        >
          Home
        </NavLink>
      </li>

      {/* ❌ Hide Membership for Admins */}
      {userData?.role !== "admin" && (
        <li>
          <NavLink
            to={`/dashboard/membership/${user?.email}`}
            className={({ isActive }) =>
              isActive
                ? "lato btn btn-neutral text-sm lg:text-xl text-text"
                : "lato btn btn-neutral btn-outline text-sm lg:text-xl text-text"
            }
          >
            Membership
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-Primary w-full lg:px-10 bg-navFooter">
      <div className="navbar-start">
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
            className="menu menu-sm dropdown-content bg-navFooter gap-3 items-center rounded-box z-1 mt-3 p-2 shadow space-x-4 bg-Secondary rounded-md hover:bg-[#c0293f]"
          >
            {navItems}
          </ul>
        </div>

        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-6">{navItems}</ul>
      </div>

      <div className="navbar-end">
        <IoNotificationsOutline className="text-xl lg:text-5xl mr-1 lg:mr-3 hover:text-white" />
        {user ? (
          <DropDown />
        ) : (
          <Link to="/auth/registration">
            <button className="lato font-semibold relative inline-flex items-center justify-center overflow-hidden text-[10px] lg:text-xl text-Text rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white">
              <span className="relative px-2 lg:px-5 py-1 lg:py-2.5 transition-all ease-in duration-75 bg-Secondary rounded-md hover:bg-[#c0293f]">
                Join US
              </span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
