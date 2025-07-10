import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import Error from "../pages/shared/Error/Error";
import Loading from "../pages/shared/Loading/Loading";
import Membership from "../pages/Membership/Membership";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "membership",
        Component: Membership,
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
