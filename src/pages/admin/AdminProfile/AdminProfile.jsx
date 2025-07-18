import React from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const fetchAdminProfile = async (email) => {
  const res = await axios.get(`http://localhost:3000/admin/${email}`);
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
    return <p className="text-center mt-8">Loading admin profile...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center mt-8">
        {error?.response?.data?.message || "Failed to load admin profile."}
      </p>
    );
  }

  return (
    <div className="w-full lg:w-2/3 mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-5xl text-center text-navFooter font-bold mb-6">
        Admin Profile
      </h2>
      <div className="flex justify-center items-center flex-col border-transparent p-10 rounded-3xl bg-amber-100 md:mx-20 lg:mx-30 xl:mx-60">
        <div>
          <img
            className="w-20 h-20 object-cover rounded-full"
            src={admin.photoURL}
            alt={admin.displayName}
          />
        </div>
        <h1 className="lato font-bold mt-3 text-xl">{user.displayName}</h1>
        <h1 className="lato mt-2">{user.email}</h1>
        <p className="lato border-transparent bg-blue-400 text-white font-semibold px-2 py-1 rounded-2xl mt-2">
          Admin
        </p>
      </div>
    </div>
  );
};

export default AdminProfile;
