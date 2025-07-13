import React from "react";
// import userPic from "../../../assets/userPic.png";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
const DropDown = () => {
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  //   console.log(user);

  return (
    <div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className=" m-1">
          <img
            src={user.photoURL}
            className="w-7 h-7 lg:w-13 lg:h-13 rounded-full object-cover"
            alt=""
          />
        </div>
        <ul
          tabIndex={0}
          className="lato dropdown-content menu bg-base-100 w-30 lg:w-40 rounded-box z-1  p-2 shadow-sm"
        >
          <p className="text-center my-2 border-transparent text-sm lg:text-xl  px-2 py-1 rounded-2xl bg-amber-200">
            {user.displayName}
          </p>

          <li>
            <Link to={"/dashboard/user-dashboard"}>Dashboard</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
