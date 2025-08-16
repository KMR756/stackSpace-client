import React from "react";
import { Link } from "react-router";
import admin from "../../../assets/admin.svg";
import ManageUsers from "../../../assets/ManageUsers.svg";
import ReportedComments from "../../../assets/ReportedComments.svg";
import MakeAnnouncement from "../../../assets/MakeAnnouncement.svg";

const cards = [
  {
    title: "Admin Profile",
    img: admin,
    link: "/dashboard/admin-dashboard/admin-profile",
  },
  {
    title: "Manage Users",
    img: ManageUsers,
    link: "/dashboard/admin-dashboard/manage-user",
  },
  {
    title: "Reported Comments",
    img: ReportedComments,
    link: "/dashboard/admin-dashboard/reported-comments",
  },
  {
    title: "Make Announcement",
    img: MakeAnnouncement,
    link: "/dashboard/admin-dashboard/make-announcement",
  },
];

const AdminDashboardCard = () => {
  return (
    <div className="flex flex-col items-center my-20 px-4">
      <h2 className="text-4xl lg:text-5xl font-bold text-navFooter mb-12 text-center">
        Admin Dashboard
      </h2>

      <div className="flex flex-wrap gap-8 justify-center">
        {cards.map((card, index) => (
          <Link key={index} to={card.link}>
            <div className="group w-[18rem] sm:w-[20rem] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <img
                className="w-full h-[14rem] object-cover"
                src={card.img}
                alt={card.title}
              />
              <div className="p-5">
                <h2 className="lato text-2xl text-center font-bold mb-1 group-hover:text-rose-600">
                  {card.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardCard;
