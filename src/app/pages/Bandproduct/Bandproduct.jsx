'use client'
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,  FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const Bandproduct = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchBrands = async () => {
      try {
        const response = await axios.get("https://fastdeals.ecommatrix.xyz/api/v1/brands",{cache:"no-store"} );
        setBrands(Array.isArray(response.data) ? response.data : response.data.products || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Data fetch error", error);
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
    return () => controller.abort();
  }, []);

  if (loading) return <div className="text-center text-gray-500 text-lg mt-10">Loading products...</div>;
  if (error) return <div className="text-center text-red-500 text-lg mt-10">Error: {error.message}</div>;

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8  mx-auto">
      
        <div className="mt-2 h-1 w-24 bg-[#2B2D42] mx-auto rounded-full" />
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
        {brands.map((band) => (
          <SwiperSlide key={band.id} className="flex flex-col items-center p-2">
            <Link href={`/brands/${band.id}`} >
           
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-md border border-gray-300 transition-transform duration-300 hover:scale-105">
              <Image
                src={band?.image 
                  ? `https://fastdeals.ecommatrix.xyz/storage/app/public/brand/${band?.image}`
                  : "/images/default-placeholder.png"}
                alt={band.name}
                width={112}
                height={112}
                className="object-fill contrast-125 w-full h-full"
              />
            </div>
            <p className="mt-2 text-center text-gray-900 font-medium text-sm sm:text-base">
              {band?.name}
            </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
};

export default Bandproduct;
