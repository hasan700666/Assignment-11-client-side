import React from "react";
import Logo from "../../../components/Logo";
import { FaFacebook, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#fee9e9] text-[#151515] py-12 text-center">
        {/* Logo / Title */}
        <h2 className="text-xl font-semibold mb-6 flex justify-center items-center">
          <Logo></Logo>
        </h2>

        {/* Menu */}
        <nav className="flex justify-center gap-6 text-sm mb-6 opacity-80">
          <a href="#">HOME</a>
          <a href="#">AGENT</a>
          <a href="#">ABOUT</a>
          <a href="#">LISTINGS</a>
          <a href="#">BLOG</a>
          <a href="#">CONTACT</a>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-5 mb-6">
          <div className="w-10 h-10 rounded-full border border-[#f22303] flex items-center justify-center cursor-pointer hover:bg-white">
            <FaXTwitter />
          </div>
          <div className="w-10 h-10 rounded-full border border-[#f22303] flex items-center justify-center cursor-pointer hover:bg-white">
            <FaYoutube />
          </div>
          <div className="w-10 h-10 rounded-full border border-[#f22303] flex items-center justify-center cursor-pointer hover:bg-white">
            <FaFacebook />
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs opacity-70">
          Copyright ©2022 All rights reserved | This template is made with ❤ by
          <span className="text-[#f22303]"> Hasan Al Muttaki</span>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
