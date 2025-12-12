import React from "react";
import Logo from "../components/Logo";
import { Outlet } from "react-router";
import SideDesign from "../pages/Auth/layout_file/SideDesign";

const AuthLayout = () => {
  return (
    <div className="flex justify-between ml-30">
      <div className="h-full">
        <Logo></Logo>
        <Outlet></Outlet>
      </div>
      <div className="w-[50vw]">
        <SideDesign></SideDesign>
      </div>
    </div>
  );
};

export default AuthLayout;
