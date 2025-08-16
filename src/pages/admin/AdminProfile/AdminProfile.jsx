import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const fetchAdminProfile = async (email) => {
  const res = await axios.get(
    `https://stack-space-server.vercel.app/admin/${email}`
  );
  return res.data;
};

const AdminProfile = () => {
  const { user, loading: authLoading } = useAuth();

  const {
    data: admin,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin", user?.email],
    queryFn: () => fetchAdminProfile(user.email),
    enabled: !!user?.email && !authLoading,
  });

  if (authLoading || isLoading) {
    return <p className="text-center mt-8 text-lg">Loading admin profile...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center mt-8 text-lg">
        {error?.response?.data?.message || "Failed to load admin profile."}
      </p>
    );
  }

  return (
    <div className="flex justify-center my-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-navFooter mb-8">
          Admin Profile
        </h2>

        {/* Profile Card */}
        <div className="flex flex-col items-center bg-amber-100 rounded-3xl p-10">
          <img
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mb-4"
            src={admin.photoURL || user.photoURL}
            alt={admin.displayName || user.displayName}
          />
          <h3 className="text-2xl font-bold mb-1">
            {admin.displayName || user.displayName}
          </h3>
          <p className="text-gray-700 mb-2">{user.email}</p>
          <span className="bg-blue-400 text-white font-semibold px-4 py-1 rounded-full">
            Admin
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
