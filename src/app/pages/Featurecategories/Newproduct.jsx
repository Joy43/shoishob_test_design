"use client";

import { IoIosHeartEmpty } from "react-icons/io";
import Image from "next/image";
import SwiperComponent from "@/app/components/swipperCompoent";
import { SwiperSlide } from "swiper/react";
import Sidebar from "@/app/components/Sidebar";


const products = [
  {
    id: 1,
    brand: "Anine Bing",
    name: "Vintage Bing Sweatshirt",
    price: "169",
    image: "https://res.cloudinary.com/disl2qbtm/image/upload/v1738860917/saolor54_pccx6c.jpg",
  },
  {
    id: 2,
    brand: "Saint Laurent",
    name: "Saint Laurent Logo ",
    price: "850",
    image: "https://res.cloudinary.com/disl2qbtm/image/upload/v1738861028/saolor32_akaxkw.jpg",
  },
  {
    id: 3,
    brand: "ba&sh",
    name: "Quest Jacket",
    price: "395",
    image: "https://res.cloudinary.com/disl2qbtm/image/upload/v1738861028/saolor36_mrj92y.jpg",
  },
  {
    id: 4,
    brand: "Zadig & Voltaire",
    name: "Bella T-Shirt",
    price: "98",
    image: "https://res.cloudinary.com/disl2qbtm/image/upload/v1738860374/saolor12_ym39sg.jpg",
  },
  {
    id: 5,
    brand: "Vince",
    name: "Half-Zip Windbreaker",
    price: "395",
    image: "https://res.cloudinary.com/disl2qbtm/image/upload/v1738861027/saolor33_aqqypn.jpg",
  },
  {
    id: 6,
    brand: "Anine Bing",
    name: "Gwyneth Silk Camisole",
    price: "149",
    image: "https://res.cloudinary.com/disl2qbtm/image/upload/v1738860372/saolor14_jiyblv.jpg",
  },
];

export default function NewProduct() {
  return (
    <div className="p-4">
      {/* Section Title */}
      <div className="text-center mb-8 lg:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-serif">
          New Arrival
        </h1>
        <button className="bg-[#D41F27] pb-2 uppercase mt-3 p-2 rounded-full text-white font-semibold">
          SPRING 2025
        </button>
      </div>

      {/* Swiper Carousel */}
      <SwiperComponent
        breakpoints={{
          320: { slidesPerView: 1.2 },
          480: { slidesPerView: 1.8 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
          1280: { slidesPerView: 5 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="w-auto">
            <div className="bg-white border-x rounded-sm shadow-sm hover:shadow-lg transition-transform duration-300 group relative p-2">
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full contrast-125 h-96 object-fill rounded-sm transition-transform duration-300 hover:scale-105"
                />
                {/* Sidebar appears on hover */}
                <div className="absolute right-1 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sidebar />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-700 text-md font-semibold">
                  {product.name}
                </p>
                <p className="text-gray-900 text-lg font-bold mt-1 ">
                  {product.price} ৳
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </SwiperComponent>
    </div>
  );
}
