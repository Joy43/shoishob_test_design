'use client';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const reviewData = [
  {
    rating: 5,
    reviewText:
      "Shoishob's clothing is top-notch! The fabric quality and unique designs make ",
    user: {
      name: 'Hamid Rahman',
      role: 'Parent & Customer',
      image: 'https://blog.bikroy.com/en/wp-content/uploads/2021/07/Hiring-the-right-Salesperson6-Dos-and-Donts-1-780x470.jpg',
    },
  },
  {
    rating: 4,
    reviewText:
      "Very satisfied with Shoishob’s collection. The styles are trendy, and my kids love wearing them!",
    user: {
      name: 'Mehedi Hasan',
      role: 'Business Owner',
      image: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
  },
  {
    rating: 5,
    reviewText:
      "Great experience shopping at Shoishob! The customer service is friendly ",
    user: {
      name: 'Nusrat Jahan',
      role: 'Fashion Enthusiast',
      image: 'https://randomuser.me/api/portraits/women/8.jpg',
    },
  },
  {
    rating: 6,
    reviewText:
      "Very satisfied with Shoishob’s collection. The styles are trendy, and my kids love wearing them!",
    user: {
      name: 'Rahat hossian',
      role: 'Business Owner',
      image: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
  },
];

const Testimonials = () => {
  return (
    <div className="bg-white p-4  w-full">
      <h1 className="text-center text-2xl md:text-3xl font-serif font-semibold text-gray-800 mb-6">
        What Our Customers Say
      </h1>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="max-w-6xl mx-auto"
      >
        {reviewData.map((review, index) => (
          <SwiperSlide key={index} className="p-4">
            <div className="flex flex-col justify-between rounded-md border border-blue-50-800 bg-slate-100 p-4 shadow-sm hover:shadow-xl transition-shadow">
              <div className="flex gap-1 text-black">
                {Array.from({ length: review.rating }, (_, i) => (
                  <FaStar key={i} size={20} />
                ))}
              </div>
              <p className="my-4 text-base leading-relaxed tracking-wide text-gray-700">
                {review.reviewText}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full shadow-md">
                  <img
                    alt={review.user.name}
                    src={review.user.image}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-800">{review.user.name}</p>
                  <p className="text-sm text-gray-700">{review.user.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
