'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import Loading from '@/app/loading';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function LatestProduct() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fastdeals.ecommatrix.xyz/api/v1/products/latest");
        setLatestProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching latest products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Loading text="Loading Latest Deals..." />;
  if (error) return <div className="text-red-600 text-center p-8 font-medium">{error}</div>;

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100  px-4 sm:px-6 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif tracking-tight">
           Latest Exclusive Discounts
          </h2>
         
        </div>

        <div className="relative group">
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={15}
            slidesPerView="auto"
            freeMode={{ enabled: true, sticky: true }}
            grabCursor
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            speed={800}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              480: { slidesPerView: 1.8 },
              640: { slidesPerView: 2.5 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4.2 },
              1280: { slidesPerView: 5 }
            }}
            className="!pb-12"
          >
            {latestProducts.map((product, index) => (
              <SwiperSlide key={product.id || index} className="!h-auto">
                <div className="h-full bg-white group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-square">
                    <Image
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src={product?.thumbnail
                        ? `https://fastdeals.ecommatrix.xyz/storage/app/public/product/thumbnail/${product.thumbnail}`
                        : '/images/default-placeholder.png'}
                      alt={product?.name || 'Product image'}
                      width={450}
                      height={450}
                      loading="lazy"
                    />
                    
                    {product.discount && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 truncate-2-lines h-14">
                        {product.name}
                      </h3>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          ৳{product.unit_price}
                        </span>
                      </div>
                    </div>

                    <Link 
                      href={`/latestproduct/${product.id}`} 
                      className="inline-flex items-center justify-center w-full gap-2 px-2 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm rounded-lg transition-all duration-300"
                    >
                      View Details
                      <FaChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <div className="swiper-navigation absolute top-1/2 -translate-y-1/2 w-full hidden lg:block">
            <button className="swiper-button-prev absolute -left-12 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all">
              <FaChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button className="swiper-button-next absolute -right-12 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all">
              <FaChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}