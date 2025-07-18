import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import Error from "../pages/shared/Error/Error";
import Loading from "../pages/shared/Loading/Loading";

import PrivateRoute from "../routes/Privateroute";
import MemberShip from "../pages/Membership/Membership";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPost from "../pages/AddPost/AddPost";
import MyProfile from "../pages/MyProfile/MyProfile";
import MyPost from "../pages/MyPost/MyPost";
import axios from "axios";
import SinglePost from "../pages/SinglePost/SinglePost";
import AdminDashboard from "../pages/admin/AdminDashboard/AdminDashboard";
import { components } from "react-select";
import AdminProfile from "../pages/admin/AdminProfile/AdminProfile";
import AdminDashboardCard from "../pages/admin/AdminDashboardCard/AdminDashboardCard";
import ManageUser from "../pages/admin/ManageUser/ManageUser";
import ReportedActivities from "../pages/admin/ReportedActivities/ReportedActivities";
import MakeAnnouncement from "../pages/admin/MakeAnouncement/MakeAnnouncement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,

    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch("http://localhost:3000/posts"),
        hydrateFallbackElement: <Loading></Loading>,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "user-dashboard",
        element: (
          <PrivateRoute>
            <UserDashboard></UserDashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile/:uid",
        loader: ({ params }) =>
          axios(`http://localhost:3000/posts/user/${params.uid}`).then(
            (res) => res.data
          ),
        hydrateFallbackElement: <Loading />,
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },

      {
        path: "add-post",
        element: (
          <PrivateRoute>
            <AddPost></AddPost>
          </PrivateRoute>
        ),
      },
      {
        path: "my-posts/:uid",
        loader: ({ params }) =>
          axios(`http://localhost:3000/posts/user/${params.uid}`).then(
            (res) => res.data
          ),
        hydrateFallbackElement: <Loading />,
        element: (
          <PrivateRoute>
            <MyPost></MyPost>
          </PrivateRoute>
        ),
      },
      {
        path: "post/:id",
        loader: ({ params }) =>
          axios(`http://localhost:3000/posts/${params.id}`).then(
            (res) => res.data
          ),
        hydrateFallbackElement: <Loading />,
        element: (
          <PrivateRoute>
            <SinglePost />
          </PrivateRoute>
        ),
      },
      {
        path: "membership/:user_email",
        element: (
          <PrivateRoute>
            <MemberShip></MemberShip>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "user-dashboard",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminDashboardCard />
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile/:uid",
        loader: ({ params }) =>
          axios(`http://localhost:3000/posts/user/${params.uid}`).then(
            (res) => res.data
          ),
        hydrateFallbackElement: <Loading />,
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "add-post",
        element: (
          <PrivateRoute>
            <AddPost />
          </PrivateRoute>
        ),
      },
      {
        path: "my-posts/:uid",
        loader: ({ params }) =>
          axios(`http://localhost:3000/posts/user/${params.uid}`).then(
            (res) => res.data
          ),
        hydrateFallbackElement: <Loading />,
        element: (
          <PrivateRoute>
            <MyPost />
          </PrivateRoute>
        ),
      },
      {
        path: "post/:id",
        loader: ({ params }) =>
          axios(`http://localhost:3000/posts/${params.id}`).then(
            (res) => res.data
          ),
        hydrateFallbackElement: <Loading />,
        element: (
          <PrivateRoute>
            <SinglePost />
          </PrivateRoute>
        ),
      },
      {
        path: "membership/:user_email",
        element: (
          <PrivateRoute>
            <MemberShip />
          </PrivateRoute>
        ),
      },
      {
        path: "admin-dashboard/admin-profile",
        element: (
          <PrivateRoute>
            <AdminProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "admin-dashboard/manage-user",
        element: (
          <PrivateRoute>
            <ManageUser />
          </PrivateRoute>
        ),
      },
      {
        path: "admin-dashboard/reported-comments",
        element: (
          <PrivateRoute>
            <ReportedActivities />
          </PrivateRoute>
        ),
      },
      {
        path: "admin-dashboard/make-announcement",
        element: (
          <PrivateRoute>
            <MakeAnnouncement />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/auth",
    Component: AuthLayout,
    errorElement: <Error />,
    children: [
      {
        path: "registration",
        Component: Registration,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);
