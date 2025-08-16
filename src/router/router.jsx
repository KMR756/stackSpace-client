import { createBrowserRouter } from "react-router";
import axios from "axios";

// Layouts
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import Error from "../pages/shared/Error/Error";
import Loading from "../pages/shared/Loading/Loading";

// User Dashboard Pages
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import MemberShip from "../pages/Membership/Membership";
import AddPost from "../pages/AddPost/AddPost";
import MyProfile from "../pages/MyProfile/MyProfile";
import MyPost from "../pages/MyPost/MyPost";
import SinglePost from "../pages/SinglePost/SinglePost";

// Admin Dashboard Pages
import AdminDashboardCard from "../pages/admin/AdminDashboardCard/AdminDashboardCard";
import AdminProfile from "../pages/admin/AdminProfile/AdminProfile";
import ManageUser from "../pages/admin/ManageUser/ManageUser";
import ReportedActivities from "../pages/admin/ReportedActivities/ReportedActivities";
import MakeAnnouncement from "../pages/admin/MakeAnouncement/MakeAnnouncement";

// Private Route
import PrivateRoute from "../routes/Privateroute";
import About from "../pages/About/About";

export const router = createBrowserRouter([
  // Root layout
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch("https://stack-space-server.vercel.app/posts"),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "about",
        Component: About,
      },
    ],
  },

  // Dashboard layout
  {
    path: "/dashboard",
    Component: DashboardLayout,
    errorElement: <Error />,
    children: [
      // User routes
      {
        path: "user-dashboard",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile/:uid",
        loader: ({ params }) =>
          axios(
            `https://stack-space-server.vercel.app/posts/user/${params.uid}`
          ).then((res) => res.data),
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
          axios(
            `https://stack-space-server.vercel.app/posts/user/${params.uid}`
          ).then((res) => res.data),
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
          axios(
            `https://stack-space-server.vercel.app/posts/${params.id}`
          ).then((res) => res.data),
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

      // Admin routes
      {
        path: "admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminDashboardCard />
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
    ],
  },

  // Auth layout
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
