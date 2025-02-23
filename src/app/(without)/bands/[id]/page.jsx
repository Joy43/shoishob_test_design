"use client";


import { use, useEffect, useState } from "react";
import Image from 'next/image'
import { useShop } from "@/app/hooks/useShop";
import Link from 'next/link'
const BandDetails = ({ params }) => {  
  
  const { id } = use(params);
  const [singleband, setSingleband] = useState([]);
  const {addToCart,addToWishlist}=useShop();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://fastdeals.ecommatrix.xyz/api/v1/brands/products/${id}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setSingleband(data);
    };

    fetchData();
  }, [id]);
console.log(singleband)
  return (
    <div className="mx-auto mt-40 p-6">
      <div className="grid lg:grid-cols-2 gap-4">
        {Array.isArray(singleband) && singleband.length > 0 ? (
          singleband.map((item) => (
            <div key={item.id} className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="flex flex-col items-center md:flex-row">
                <div className="md:w-1/3 p-4 relative">
                  <Image 
                    src={`https://fastdeals.ecommatrix.xyz/storage/app/public/product/thumbnail/${item?.thumbnail}`}
                    width={500}
      height={500}
       alt="Picture of the author"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{item?.name}</h1>
                  <p className="text-sm text-gray-600 mb-4">{item?.meta_title}</p>
                  <p className="text-sm text-gray-600 mb-4">{item?.slug}</p>
                  <div className="flex items-center mb-4">
                    {/* <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">4.5 ★</span> */}
                    <span className="text-sm text-gray-500 ml-2">{item?.reviews_count} reviews</span>
                  </div>
                  <ul className="text-sm text-gray-700 mb-6">
                    <li className="flex items-center mb-1">
                      <span dangerouslySetInnerHTML={{ __html: item?.key_features }} />
                    </li>
                  </ul>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-gray-900">৳ {item?.unit_price}</span>
                      <span className="ml-2 text-sm font-medium text-gray-500 line-through">
                        ৳{((item?.unit_price * 100) / (100 - item?.discount)).toFixed(2)}
                      </span>
                    </div>
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      Save {item.discount}%
                    </span>
                  </div>
                 
                  <div className="flex space-x-4">
                  <button
      key={item.id}
      onClick={() => addToCart(item.id)}
      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
    >
      Add to Cart
    </button>
                    <button onClick={() => addToWishlist(item.id)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition duration-300">
                      Wishlist
                    </button>
                    {/* ---------view deatilsi--------- */}
                    <Link
                      href={`/bands/singleband/${item.slug}`}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-2 px-4 rounded transition duration-300 text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No brands available.</p>
        )}
      </div>
    </div>
  );
};

export default BandDetails;
