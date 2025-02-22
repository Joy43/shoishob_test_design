"use client";

import SwiperComponent from '@/app/components/swipperCompoent';
import Image from 'next/image';
import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';
 // import the reusable component

const games = [
  {
    id: 1,
    title: 'VALORANT',
    viewers: '78.4K viewers',
    image: 'https://res.cloudinary.com/disl2qbtm/image/upload/v1738861028/saolor36_mrj92y.jpg',
    tags: ['Shooter', 'FPS'],
  },
  {
    id: 2,
    title: 'Just Chatting',
    viewers: '236K viewers',
    image: 'https://d1190btxnvweoc.cloudfront.net/uploads/all/7wRPrIJ7mbNLvXg0FXYQ0D4U1MmxacytZN1CzDa6.jpg',
    tags: ['IRL'],
  },
  {
    id: 3,
    title: 'Elden Ring',
    viewers: '350K viewers',
    image: 'https://d1190btxnvweoc.cloudfront.net/uploads/all/wgMl06KVwKmqVaoXpmRQATqBTOY0VcQyI01T9lJ7.jpg',
    tags: ['RPG', 'Action'],
  },
  {
    id: 4,
    title: 'Apex Legends',
    viewers: '89.7K viewers',
    image: 'https://res.cloudinary.com/disl2qbtm/image/upload/v1738861027/saolor33_aqqypn.jpg',
    tags: ['FPS', 'Shooter'],
  },
  {
    id: 5,
    title: 'Genshin Impact',
    viewers: '9K viewers',
    image: 'https://res.cloudinary.com/disl2qbtm/image/upload/v1738861026/saolor45_bas0yu.jpg',
    tags: ['Action', 'RPG'],
  },
  {
    id: 6,
    title: 'Lost Ark',
    viewers: '199K viewers',
    image: 'https://res.cloudinary.com/disl2qbtm/image/upload/v1738861027/saolor33_aqqypn.jpg',
    tags: ['RPG', 'Action', 'MMO'],
  },
  {
    id: 7,
    title: 'Apex Legends',
    viewers: '89.7K viewers',
    image: 'https://res.cloudinary.com/disl2qbtm/image/upload/v1738861025/saolor55_tkfmc1.jpg',
    tags: ['FPS', 'Shooter'],
  },
  {
    id: 8,
    title: 'Apex Legends',
    viewers: '89.7K viewers',
    image: 'https://res.cloudinary.com/disl2qbtm/image/upload/v1738860917/saolor54_pccx6c.jpg',
    tags: ['FPS', 'Shooter'],
  },
];

const breakpoints = {
  320: { slidesPerView: 1.2 },
  480: { slidesPerView: 1.8 },
  640: { slidesPerView: 2.5 },
  768: { slidesPerView: 3.2 },
  1024: { slidesPerView: 4.2 },
  1280: { slidesPerView: 5 },
  1536: { slidesPerView: 6, spaceBetween: 20 },
};

const Testcategories = () => (
  <div className="p-6 bg-white">
    <div className="text-center mb-8 lg:mb-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-serif">
        Trending Categories
      </h1>
      <button className="bg-[#D41F27] pb-2 uppercase mt-3 p-2 rounded-full text-white font-semibold">
        categories 2025
      </button>
    </div>

    <SwiperComponent slidesPerView="auto" breakpoints={breakpoints}>
      {games.map((categories) => (
        <SwiperSlide key={categories.id} className="auto">
          <div className="flex flex-col gap-1">
            <Link href="/" className="bg-red-400">
              <Image
                src={categories?.image}
                alt={categories?.title}
                width={485}
                height={380}
                className="hover:translate-x-1 h-90 contrast-100 hover:-translate-y-1 transition-transform duration-100"
              />
            </Link>
            <Link href="/" className="hover:text-purple-500 text-center text-gray-900 font-semibold">
              {categories?.title}
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </SwiperComponent>
  </div>
);

export default Testcategories;
