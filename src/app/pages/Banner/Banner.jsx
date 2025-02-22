'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
const slides = [
  {
    image: 'https://res.cloudinary.com/disl2qbtm/image/upload/v1738633765/vecteezy_cute-asian-girl-with-teddy-bear-standing-alone-on-yellow_27184827-scaled_tek4a5.jpg',
    title: ' New Arrivals Here',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
  },
  {
    image: 'https://res.cloudinary.com/dluuillmt/image/upload/v1740202993/banner_new_c8ec8z.png',
    title: 'Redefine Your Style ',
    buttonText: 'Explore',
    buttonLink: '/explore',
  },
  {
    image: 'https://res.cloudinary.com/dluuillmt/image/upload/v1740204883/winterfes_rkwoek.jpg',
    title: ' Winter Fashion',
    buttonText: 'Explore',
    buttonLink: '/explore',
  },
  {
    image: 'https://res.cloudinary.com/disl2qbtm/image/upload/v1738632743/vecteezy_boy-in-casual-clothes-with-books-pointing-at-empty-space_27184802-scaled_rnev7w.jpg',
    title: ' Winter Essentials for Kids',
    buttonText: 'Explore',
    buttonLink: '/explore',
  },
];


export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative mt-40 p-4 w-full h-[600px] sm:h-[450px] md:h-[500px] lg:h-[800px] xl:h-[750px] overflow-hidden shadow-sm rounded-md">
      {/*-------------- Image Slides --------------*/}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              currentIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {/* --------banner image------------ */}
            <Image 
              src={slide.image} 
              alt={`Slide ${index + 1}`} 
              fill 
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
              className="object-fill w-full h-full rounded-md brightness-125"
            />

            {/* ------------ Text Overlay - Bottom Left ------------*/}
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16 max-w-[90%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] bg-gradient-to-r from-black/80 to-transparent p-6 rounded-lg shadow-md">
              
              {/* --------- Slide Indicator -----------*/}
              <div className="absolute -top-3 left-0 bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-md">
                {currentIndex + 1} / {slides.length}
              </div>

              {/*------------- Slide Title -------------*/}
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 drop-shadow-lg">
                {slide.title}
              </h2>

              {/* ------------- CTA Button ---------------*/}
              <a
                href={slide.buttonLink}
                className="inline-block bg-[#2B2D42] text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/*----------- Navigation Buttons -------------*/}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md hover:bg-white/90 transition"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md hover:bg-white/90 transition"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  );
}
