import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router";

const Logo = () => {
  return (
    <div>
      <NavLink to="/">
        <img src={logo} alt="" className="w-20 body" />
      </NavLink>
    </div>
  );
};

export default Logo;
