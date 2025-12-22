import React from "react";
import Logo from "../components/Logo";
import { Outlet } from "react-router";
import SideDesign from "../pages/Auth/layout_file/SideDesign";

const AuthLayout = () => {
  return (
    <div className="flex xl:justify-between justify-center items-center xl:ml-30 ml-0">
      <div className="h-full flex flex-col xl:justify-start xl:items-start justify-center items-center">
        <Logo></Logo>
        <Outlet></Outlet>
      </div>
      <div className="xl:w-[50vw] xl:flex hidden">
        <SideDesign></SideDesign>
      </div>
    </div>
  );
};

export default AuthLayout;
