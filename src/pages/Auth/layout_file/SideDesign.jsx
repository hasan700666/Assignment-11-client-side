import React from "react";
import Marquee from "react-fast-marquee";
import img_1 from "../../../assets/1.jpg";
import img_2 from "../../../assets/2.jpg";
import img_3 from "../../../assets/3.jpg";
import img_4 from "../../../assets/4.jpg";
import img_5 from "../../../assets/5.jpg";
import img_6 from "../../../assets/6.jpg";
import img_7 from "../../../assets/7.jpg";
import img_8 from "../../../assets/8.jpg";
import img_9 from "../../../assets/9.jpg";
import img_10 from "../../../assets/10.jpg";

const SideDesign = () => {
  return (
    <div className="bg-[#fee9e6]">
      {
        <Marquee className="h-screen" speed={100} direction="up">
          <img
            src={img_1}
            alt=""
            className="2xl:w-150 xl:w-60 2xl:h-100  xl:h-30 overflow-hidden radius_css  "
          />
          <img
            src={img_2}
            alt=""
            className="2xl:w-150 xl:w-60 2xl:h-100  xl:h-30 overflow-hidden radius_css  "
          />
          <img
            src={img_3}
            alt=""
            className="2xl:w-150 xl:w-60 2xl:h-100  xl:h-30 overflow-hidden radius_css  "
          />
          <img
            src={img_4}
            alt=""
            className="2xl:w-150 xl:w-60 2xl:h-100  xl:h-30 overflow-hidden radius_css  "
          />
          <img
            src={img_5}
            alt=""
            className="2xl:w-150 xl:w-60 2xl:h-100  xl:h-30 overflow-hidden radius_css  "
          />
          <img
            src={img_6}
            alt=""
            className="2xl:w-150 xl:w-60 2xl:h-100  xl:h-30 overflow-hidden radius_css  "
          />
          <img
            src={img_7}
            alt=""
            className="2xl:w-150 xl:w-60 2xl:h-100  xl:h-30 overflow-hidden radius_css  "
          />
          <img
            src={img_8}
            alt=""
            className="2xl:w-150 xl:w-60 2xl:h-100  xl:h-30 overflow-hidden radius_css  "
          />
          <img
            src={img_9}
            alt=""
            className="2xl:w-150 xl:w-60 2xl:h-100  xl:h-30 overflow-hidden radius_css  "
          />
          <img
            src={img_10}
            alt=""
            className="2xl:w-150 xl:w-60 2xl:h-100  xl:h-30 overflow-hidden radius_css  "
          />
        </Marquee>
      }
    </div>
  );
};

export default SideDesign;
