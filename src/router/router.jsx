import { createBrowserRouter } from "react-router";
import Root from "../layout/layout_1/Root";
import Home from "../pages/Home";
import AllIssues from "../pages/AllIssues";
import About from "../pages/About";
import MyIssues from "../pages/MyIssues";
import MyFavorites from "../pages/MyFavorites";
import SingUp from "../pages/SingUp";
import Login from "../pages/Login";
import Root2 from "../layout/layout_2/Root2";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
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
        Component: MyFavorites,
      },
    ],
  },
  {
    path: "/user/",
    Component: Root2,
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
]);
