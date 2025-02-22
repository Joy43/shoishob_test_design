"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SwiperComponent = ({ children, breakpoints, slidesPerView = "auto" }) => {
  const swiperRef = useRef(null);

  return (
    <div className="relative w-full">
      {/* Left Button */}
      <button
        onClick={() => swiperRef.current?.slidePrev?.()}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white text-red-400 p-2 rounded-full shadow-md hover:bg-gray-100 bg-opacity-80 hidden lg:flex"
      >
        <FaChevronLeft size={30} />
      </button>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Autoplay, FreeMode, Navigation]}
        spaceBetween={20}
        slidesPerView={slidesPerView}
        freeMode={true}
        grabCursor={true}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={800}
        breakpoints={breakpoints}
        className="!pb-10"
      >
        {children}
      </Swiper>

      {/* Right Button */}
      <button
        onClick={() => swiperRef.current?.slideNext?.()}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white text-red-400 p-2 rounded-full shadow-md hover:bg-gray-100 bg-opacity-80 hidden lg:flex"
      >
        <FaChevronRight size={30} />
      </button>
    </div>
  );
};

export default SwiperComponent;