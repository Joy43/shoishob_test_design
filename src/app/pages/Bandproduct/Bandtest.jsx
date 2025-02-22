"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";

const bands = [
  { id: 1, name: "Woman", image: "https://res.cloudinary.com/dyosy3vte/image/upload/v1738868562/saolor36_cmsdsl.jpg" },
  { id: 2, name: "Man", image: "https://res.cloudinary.com/dyosy3vte/image/upload/v1738868557/saolor15_hqknyv.jpg" },
  { id: 3, name: "Person", image: "https://res.cloudinary.com/dyosy3vte/image/upload/v1738868557/saolor44_r9zgxa.jpg" },
  { id: 4, name: "Person", image: "https://res.cloudinary.com/dyosy3vte/image/upload/v1738868559/saolor27_rwtg6d.jpg" },
  { id: 5, name: "Bottom", image: "https://res.cloudinary.com/dyosy3vte/image/upload/v1738868559/saolor27_rwtg6d.jpg" },
  { id: 6, name: "Bottom", image: "https://res.cloudinary.com/dyosy3vte/image/upload/v1738868557/saolor37_pcbo75.jpg" },
  { id: 7, name: "James Design", image: "https://res.cloudinary.com/dyosy3vte/image/upload/v1738868560/saolor53_hguzfa.jpg" },
  { id: 8, name: "James Design", image: "https://res.cloudinary.com/disl2qbtm/image/upload/v1738861028/saolor36_mrj92y.jpg" },
  { id: 9, name: "James Design", image: "https://res.cloudinary.com/disl2qbtm/image/upload/v1738860374/saolor10_qolbvh.jpg" },
  { id: 10, name: "James Design", image: "https://res.cloudinary.com/disl2qbtm/image/upload/v1738860372/saolor15_xacleq.jpg" },
  { id: 11, name: "James Design", image: "https://res.cloudinary.com/disl2qbtm/image/upload/v1738860372/saolor14_jiyblv.jpg" },
];

export default function BandSlider() {
  return (
    <div className="w-full p-4 bg-white rounded-sm shadow-sm">
      <div className="text-center mb-8 space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif tracking-tight">
          Exclusive Brands
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our specially curated limited-time offers.
        </p>
      </div>
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={10}
        slidesPerView="auto"
        freeMode={true}
        grabCursor
        loop
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={800}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 5 },
          480: { slidesPerView: 3, spaceBetween: 5 },
          640: { slidesPerView: 4, spaceBetween: 8 },
          768: { slidesPerView: 6, spaceBetween: 10 },
          1024: { slidesPerView: 8, spaceBetween: 12 },
          1280: { slidesPerView: 9, spaceBetween: 15 },
        }}
        className="!pb-10"
      >
        {bands.map((band) => (
          <SwiperSlide key={band.id} className="flex flex-col items-center p-2">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border border-gray-300 transition-transform duration-300 hover:scale-105">
              <Image
                src={band.image}
                alt={band.name}
                width={112}
                height={112}
                className="object-fill contrast-125 w-full h-full"
              />
            </div>
            <p className="mt-2 text-center text-gray-900 font-medium text-sm sm:text-base">
              {band?.name}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
