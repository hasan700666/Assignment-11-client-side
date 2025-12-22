import React from "react";
import img from "../../assets/404img.jpg";
import { NavLink } from "react-router";
import Logo from "../../components/Logo";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center flex-col my-10">
        <div><Logo></Logo></div>
      <div className="flex justify-center items-center bg-[#ffeded] p-10 my-10 rounded-3xl">
        <div className="text-9xl text-[#bf1e2e]">4</div>
        <div>
          <img src={img} alt="" />
        </div>
        <div className="text-9xl text-[#ee1c25]">4</div>
      </div>
      <div>
        <NavLink to="/">
          <button className="btn_css">
            Go Back To Home Page
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
