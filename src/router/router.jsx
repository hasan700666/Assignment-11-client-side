import { createBrowserRouter } from "react-router";
import Home from "../pages/Root/home/Home";
import AllIssues from "../pages/Root/allIssues/AllIssues";
import About from "../pages/Root/about/About";
import MyIssues from "../pages/Root/myIssues/MyIssues";
import MyFavorites from "../pages/Root/myFavorites/MyFavorites";
import SingUp from "../pages/Auth/singUp/SingUp";
import PrivetRoute from "./PrivetRoute";
import AddIssues from "../pages/Root/addIssues/AddIssues";
import Profile from "../pages/Dashbord/profile/Profile";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Login from "../pages/Auth/login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "all_issues",
        Component: AllIssues,
      },
      {
        path: "my_issues",
        Component: MyIssues,
      },
      {
        path: "my_favorites",
        element: (
          <PrivetRoute>
            <MyFavorites></MyFavorites>
          </PrivetRoute>
        ),
      },
      {
        path: "add_issues",
        element: (
          <PrivetRoute>
            <AddIssues></AddIssues>
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/user/",
    Component: AuthLayout,
    children: [
      {
        path: "sing_up",
        Component: SingUp,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout></DashboardLayout>
      </PrivetRoute>
    ),
    children: [
      {
        index: true,
        Component: Profile,
      },
    ],
  },
]);
