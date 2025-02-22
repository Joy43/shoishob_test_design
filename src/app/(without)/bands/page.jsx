"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function BandSlider() {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const response = await axios.get("https://fastdeals.ecommatrix.xyz/api/v1/brands");
        const formattedBands = response.data.map((band) => ({
          id: band.id,
          name: band.name,
          image: band.image
            ? `https://fastdeals.ecommatrix.xyz/storage/app/public/brand/${band.image}`
            : "/images/default-placeholder.png",
          link: `/bands/${band.id}`,
        }));
        setBands(formattedBands);
      } catch (err) {
        console.error("Error fetching bands:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBands();
  }, []);

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

      {loading ? (
        <p className="text-center text-gray-500">Loading brands...</p>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load brands.</p>
      ) : bands.length > 0 ? (
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
              <Link href={band.link}>
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border border-gray-300 transition-transform duration-300 hover:scale-105">
                  <Image
                    src={band.image}
                    alt={band.name}
                    width={112}
                    height={112}
                    className="object-fill contrast-125 w-full h-full"
                  />
                </div>
              </Link>
              <p className="mt-2 text-center text-gray-900 font-medium text-sm sm:text-base">
                {band.name}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">No bands found.</p>
      )}
    </div>
  );
}
