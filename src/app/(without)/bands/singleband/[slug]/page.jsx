"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const Singlebandetails = () => {
  const params = useParams();
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Params:", params); 
  console.log("Slug:", slug); 

  useEffect(() => {
    if (!slug) return;

    const fetchProductDetails = async () => {
      setLoading(true);
   

      try {
        const res = await fetch(
          `https://fastdeals.ecommatrix.xyz/api/v1/products/details/${slug}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch product details");

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log('fetching error',error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [slug]);

  if (loading) {
    return <p className="text-gray-500 text-center mt-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-20">Error: {error}</p>;
  }

  if (!product) {
    return <p className="text-gray-500 text-center mt-20">No product found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-40 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{product?.name}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4 relative">
          <Image
            src={`https://fastdeals.ecommatrix.xyz/storage/app/public/product/thumbnail/${product?.thumbnail}` || "https://via.placeholder.com/500"}
            width={500}
            height={500}
            alt={product?.name || "Product Image"}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="md:w-2/3 p-6">
          <p className="text-sm text-gray-600 mb-4">{product?.meta_title}</p>
          <span className="text-sm text-gray-500">{product?.reviews_count} reviews</span>
          <span className="text-3xl font-bold text-gray-900">
            ৳ {product?.unit_price}
          </span>
          <p className="text-gray-700 mt-4">{product?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Singlebandetails;
