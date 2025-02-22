"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

const Gallery = () => {
  const cards = [
  
    {
      image: "https://res.cloudinary.com/dluuillmt/image/upload/v1740202813/discount_cyzdtn.jpg",
      title: "Boys Collection",
    },
    {
      image: "https://res.cloudinary.com/dluuillmt/image/upload/v1740205311/explore_shoishob_p3gdbx.jpg",
      title: "Winter Collection",
    },
    {
      image:
        "https://res.cloudinary.com/dluuillmt/image/upload/v1740205850/more_faction_zclqxh.jpg",
      title: "Summer Collection",
    },
  ];

  return (
    <section className="flex flex-col md:flex-row gap-4 p-4">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="w-full "
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="relative rounded-sm shadow-sm overflow-hidden group">
              <div className="w-full h-[700px] relative">
                <Image
                  src={card.image}
                  alt={card.title}
                  layout="fill"
             
                  className="transition-transform object-fill contrast-125 duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
              {/*------------- Overlay Text ----------*/}
              <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/30 text-white p-4 transition-opacity duration-300">
          <button className="bg-white text-black  px-6 py-2 font-semibold shadow-md hover:bg-blue-800">
            SHOP PRODUCT
          </button>
        </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;
