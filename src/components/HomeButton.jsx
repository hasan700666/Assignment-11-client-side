import React from "react";
import { NavLink } from "react-router";

const HomeButton = () => {
  return (
    <NavLink to="/">
      <button className="btn_css">Go To Home Page</button>
    </NavLink>
  );
};

export default HomeButton;
