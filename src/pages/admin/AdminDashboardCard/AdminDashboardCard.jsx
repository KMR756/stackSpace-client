import React from "react";
import admin from "../../../assets/admin.svg";
import ManageUsers from "../../../assets/ManageUsers.svg";
import ReportedComments from "../../../assets/ReportedComments.svg";
import MakeAnnouncement from "../../../assets/MakeAnnouncement.svg";
import { Link } from "react-router";

const AdminDashboardCard = () => {
  return (
    <div>
      <div class="flex my-20 flex-wrap gap-8 justify-center items-center">
        <Link to={"/dashboard/admin-dashboard/admin-profile"}>
          <div className="group w-[18rem] sm:w-[20rem] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <img
              className="w-full h-[14rem] object-cover"
              src={admin}
              alt="Profile"
            />
            <div className="p-5">
              <h2 className="lato text-2xl text-center font-bold mb-1 group-hover:text-rose-600">
                Admin Profile
              </h2>
            </div>
          </div>
        </Link>

        <Link to={"/dashboard/admin-dashboard/manage-user"}>
          <div class="group w-[18rem] sm:w-[20rem] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <img
              class="w-full h-[14rem] object-cover"
              src={ManageUsers}
              alt="Sushi"
            />
            <div class="p-5">
              <h2 class="lato text-2xl text-center font-bold  mb-1 group-hover:text-rose-600 ">
                Manage Users
              </h2>
            </div>
          </div>
        </Link>

        <Link to={`/dashboard/admin-dashboard/make-announcement`}>
          <div class="group w-[18rem] sm:w-[20rem] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <img
              class="w-full h-[14rem] object-cover"
              src={MakeAnnouncement}
              alt="Sushi"
            />
            <div class="p-5">
              <h2 class="lato text-2xl text-center font-bold  mb-1 group-hover:text-rose-600 ">
                Make Announcement
              </h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
