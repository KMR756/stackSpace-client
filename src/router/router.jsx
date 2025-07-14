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
      {
        path: "membership",
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
            <UserDashboard></UserDashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
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
        path: "my-post",
        element: (
          <PrivateRoute>
            <MyPost></MyPost>
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
