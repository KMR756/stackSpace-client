import { Link } from "react-router"; // Fix: use react-router-dom, not react-router
import useAuth from "../../../hooks/useAuth";
import axios from "axios"; // Plain axios
import { useEffect, useState } from "react";

const DropDown = () => {
  const { user, logOut } = useAuth();

  const [userData, setUserData] = useState(null); // ✅ Declare state

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`)
        .then((res) => {
          setUserData(res.data); // ✅ Save to state
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user?.email]);
  console.log(userData);

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Optional: show a toast or redirect
      })
      .catch((error) => {
        console.error("Logout failed", error);
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
          {userData?.name}

          <p className="lato border-transparent text-xs mx-5 bg-blue-400 text-white font-semibold px-2 py-1 rounded-2xl mt-1">
            {userData?.membership ? "Gold" : "Bronze"}
          </p>
        </p>

        <li>
          <Link to="/dashboard/user-dashboard">Dashboard</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
