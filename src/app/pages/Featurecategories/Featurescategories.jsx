'use client';

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaArrowCircleRight } from "react-icons/fa";

const Featurescategories = () => {
  const scrollContainer = useRef(null);
  const [categories, setCategories] = useState([]);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    axios
      .get("https://fastdeals.ecommatrix.xyz/api/v1/categories")
      .then((res) => setCategories(res.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const interval = setInterval(() => {
        scrollRight();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoScroll]);

  const scrollLeft = () => {
    scrollContainer.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainer.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="px-4 py-8 lg:py-6 bg-gray-50 relative w-full mx-auto">
      <div className="text-center mb-8 lg:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-serif">
          Trending Categories
        </h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Explore our most popular categories
        </p>
      </div>
      
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-10" />
        
        <div className="relative flex items-center">
          <button 
            onClick={scrollLeft} 
            className="hidden sm:block absolute -left-4 lg:-left-6 z-20 bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-gray-700 w-4 h-4 lg:w-5 lg:h-5" />
          </button>
          
          <div 
            ref={scrollContainer} 
            className="flex gap-4 sm:gap-6 overflow-x-auto px-2 sm:px-4 py-4 w-full
              [-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:hidden
              [-ms-overflow-style:none]
              [scrollbar-width:none]"
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
          >
            {categories.map((category) => (
              <Link 
                href={`/categories/${category.id}`} 
                key={category.id} 
                className="flex-shrink-0 w-[45vw] sm:w-[35vw] md:w-[30vw] lg:w-[22vw] xl:w-[270px] h-[400px] 2xl:w-[400px] snap-start"
              >
                <div className="relative group aspect-square rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                  <Image
                    className="object-fill w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    src={`https://fastdeals.ecommatrix.xyz/storage/app/public/category/${category.icon}`}
                    alt={category.name}
                    width={400}
                    height={400}
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-center">
                    <div className="inline-flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-sm hover:bg-white transition-colors duration-300">
                      <span className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                        {category.name}
                      </span>
                      <FaArrowCircleRight className="ml-2 text-black w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <button 
            onClick={scrollRight} 
            className="hidden sm:block absolute -right-4 lg:-right-6 z-20 bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-gray-700 w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featurescategories;