import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import img from "../../../assets/issuesIMG.png";
import { Autoplay } from "swiper/modules";

const Slider = () => {
  return (
    <div className="bg-[#fee9e6] w-9/12 h-[80vh] mx-auto my-10 radius_css">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        <SwiperSlide>
          <div
            className="w-full h-[80vh]
  bg-[url('src/assets/citydroing.png')] bg-cover bg-center bg-no-repeat"
          >
            <div className="text-6xl p-10">Make your town</div>
            <div className="text-7xl mx-10 text_design_like_btn w-130 text-center">
              Bright
            </div>
            <div className="m-10">
              <button className="btn_css">Submit a issues</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[80vh] rounded-xl shadow-lg bg-white overflow-hidden flex justify-between">
            <div className="mx-10  p-6 flex flex-col justify-center">
              <p className="text-2xl tracking-wide text-gray-500">
                NEW-USER DISCOUNT!
              </p>

              <h2 className="text-7xl font-extrabold text-gray-800 leading-snug mt-2">
                Big Discount <br /> on <br /> Sbscreption
              </h2>

              <button className="btn_css">Buy Now</button>
            </div>

            {/* Right Section – Illustration */}
            <div className="w-2/3 flex justify-end items-center p-4">
              <img src={img} alt="" className="absolute w-2xl right-10 -rotate-12"/>
              <div className="bg-[#fdeee8] w-1/2 h-full"></div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
