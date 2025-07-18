import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../shared/Loading/Loading";

const fetchUsers = async (search) => {
  const res = await axios.get(`http://localhost:3000/users?search=${search}`);
  return res.data;
};

const makeAdminRequest = async (id) => {
  const res = await axios.patch(`http://localhost:3000/users/make-admin/${id}`);
  return res.data;
};

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: () => fetchUsers(search),
  });

  const makeAdminMutation = useMutation({
    mutationFn: makeAdminRequest,
    onSuccess: () => {
      Swal.fire("Success", "User promoted to admin", "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      Swal.fire("Error", "Failed to make admin", "error");
    },
  });

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will become an admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, promote",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-6 lato">
      <h2 className="text-center text-navFooter text-4xl font-bold mb-4">
        Manage Users
      </h2>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border px-3 py-2 rounded w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <p className="text-red-500">Failed to load users</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-2/3 mx-auto border ">
            <thead className="bg-amber-200 ">
              <tr>
                <th className="py-2 px-4 border ">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Membership</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.filter((user) => user.email !== "stackspace@admin.com")
                .length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No users found
                  </td>
                </tr>
              ) : (
                users
                  .filter((user) => user.email !== "stackspace@admin.com")
                  .map((user) => (
                    <tr key={user._id}>
                      <td className="py-2 px-4 border">{user.name}</td>
                      <td className="py-2 px-4 border">{user.email}</td>
                      <td className="py-2 px-4 border ">
                        <p className="lato border-transparent w-[40%] text-center bg-blue-400 text-white font-semibold px-2 py-1 rounded-2xl mt-2">
                          {user?.role === "admin"
                            ? "Admin"
                            : user?.membership
                            ? "Gold"
                            : "Bronze"}
                        </p>
                      </td>
                      <td className="py-2 px-4 border">
                        {user.role === "admin" ? (
                          <span className="text-green-600 font-semibold">
                            Admin
                          </span>
                        ) : (
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                            onClick={() => handleMakeAdmin(user._id)}
                          >
                            Make Admin
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
