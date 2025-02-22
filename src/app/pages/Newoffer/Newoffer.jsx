"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const offers = [
  {
    id: 1,
    discount: "25% OFF",
    title: "SUMMER DEALS",
    description:
      "Don't miss out on some very special items at extraordinary sale prices. For a limited time",
    imageUrl: "https://res.cloudinary.com/dluuillmt/image/upload/v1740202580/big_offer_vuxwjy.jpg",
    altText: "Summer sale offer on Shoishob products",
  },
  {
    id: 2,
    discount: "10% OFF",
    title: "WINTER DEALS",
    description:
      "Don't miss out on some very special items at extraordinary sale prices. For a limited time",
    imageUrl: "https://res.cloudinary.com/dluuillmt/image/upload/v1740202581/sobejcha_smsaho.jpg",
    altText: "Winter season special offers",
  },
];

export default function Newoffer() {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % offers.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const currentOffer = offers[currentOfferIndex];

  return (
    <section className="flex items-center justify-center px-6 sm:px-10 py-12 w-full bg-gray-50 min-h-[450px] overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl w-full gap-8 h-full">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center space-y-6">
          <p className="text-4xl sm:text-5xl font-bold text-[#DB5A5F] animate-fade-in-up">
            {currentOffer?.discount}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {currentOffer?.title}
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed max-w-lg mx-auto md:mx-0">
            {currentOffer?.description}
          </p>
          <div className="mt-4">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm rounded-lg transition-all duration-300"
            >
              View Details
              <FaChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center h-full">
          <div className="relative w-full h-[450px] max-w-[450px] transition-transform duration-500 hover:scale-105">
            {offers.map((offer, index) => (
              <Image
                key={offer.id}
                src={offer.imageUrl}
                alt={offer.altText}
                fill
                priority
                className={`rounded-xl shadow-2xl object-fill absolute transition-opacity duration-700 ease-in-out ${
                  index === currentOfferIndex ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 40vw"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
