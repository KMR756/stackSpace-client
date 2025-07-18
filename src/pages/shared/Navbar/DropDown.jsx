import { Link, useNavigate } from "react-router"; // ✅ Correct import
import useAuth from "../../../hooks/useAuth";
import axios from "axios"; // ✅ Plain axios
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const DropDown = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // ✅ Declare state

  // ✅ Fetch user data using plain axios
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(
            `https://stack-space-server.vercel.app/users/${user.email}`
          );
          setUserData(res.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user?.email]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged out",
              text: "You have been logged out successfully.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
            navigate("/auth/login");
          })
          .catch((error) => {
            console.error("Logout failed", error);
            Swal.fire("Error", "Something went wrong during logout.", "error");
          });
      }
    });
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="m-1">
        <img
          src={user?.photoURL}
          className="w-7 h-7 lg:w-13 lg:h-13 rounded-full object-cover"
          alt="User"
        />
      </div>
      <ul
        tabIndex={0}
        className="lato dropdown-content menu bg-base-100 w-30 lg:w-40 rounded-box z-10 p-2 shadow-sm"
      >
        <p className="text-center my-2 text-sm lg:text-xl px-2 py-1 rounded-2xl bg-amber-200">
          {user?.displayName}
          <p className="lato border-transparent text-xs mx-5 bg-blue-400 text-white font-semibold px-2 py-1 rounded-2xl mt-1">
            {userData?.role === "admin"
              ? "Admin"
              : userData?.membership
              ? "Gold"
              : "Bronze"}
          </p>
        </p>

        <li>
          <Link
            to={
              userData?.role === "admin"
                ? "/dashboard/admin-dashboard"
                : "/dashboard/user-dashboard"
            }
          >
            {userData?.role === "admin" ? "Admin Dashboard" : "Dashboard"}
          </Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
