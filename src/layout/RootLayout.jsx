import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Root/layout_file/Navbar";
import Footer from "../pages/Root/layout_file/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
