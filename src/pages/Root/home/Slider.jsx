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
  bg-[url('src/assets/citydroing.png')] bg-cover bg-center bg-no-repeat 2xl:block flex flex-col justify-center items-center"
          >
            <div className=" md:text-7xl sm:text-6xl text-5xl p-10 2xl:text-left text-center">
              Make your town
            </div>
            <div className="flex 2xl:justify-start justify-center items-center">
              <div className=" md:text-7xl sm:text-6xl text-5xl mx-10 text_design_like_btn w-130 text-center 2xl:text-left">
                Bright
              </div>
            </div>
            <div className="m-10 flex 2xl:justify-start items-center justify-center">
              <button className="btn_css">Submit a issues</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[80vh] rounded-xl shadow-lg bg-white overflow-hidden flex lg:justify-between justify-center items-center">
            <div className="mx-10 p-6 flex flex-col justify-center lg:items-start items-center">
              <p className="md:text-2xl text-xl tracking-wide text-gray-500 text-center">
                NEW-USER DISCOUNT!
              </p>

              <h2 className="md:text-7xl sm:text-6xl text-4xl font-extrabold text-gray-800 leading-snug mt-2 lg:text-start text-center">
                Big Discount <br /> on <br /> Sbscreption
              </h2>

              <button className="btn_css">Buy Now</button>
            </div>

            {/* Right Section – Illustration */}
            <div className="w-2/3 lg:flex lg:justify-end lg:items-center p-4 hidden">
              <img
                src={img}
                alt=""
                className="absolute 2xl:w-xl w-70 right-10 -rotate-12"
              />
              <div className="bg-[#fdeee8] w-1/2 h-full"></div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
