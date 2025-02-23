'use client'
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const Singlecatproductdetails = () => {
  const params = useParams();
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(""); // To hold the currently selected image

  const baseURL = "https://fastdeals.ecommatrix.xyz/storage/app/public/product/";

  useEffect(() => {
    if (!slug) return;

    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null); 

      try {
        const res = await fetch(
          `https://fastdeals.ecommatrix.xyz/api/v1/products/details/${slug}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch product details");

        const data = await res.json();
        setProduct(data);

        // Parse the images string into an array
        if (data?.images && typeof data.images === 'string') {
          const parsedImages = JSON.parse(data.images); // Parse the string to an array
          if (parsedImages.length > 0) {
            setCurrentImage(parsedImages[0]); // Set the first image as the default
          }
        }
      } catch (error) {
        console.error("Fetching error:", error);
        setError(error.message); // Store error message
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

  const isValidImageURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getValidImageSrc = (image) => {
    const imageUrl = baseURL + image;
    if (isValidImageURL(imageUrl)) {
      return imageUrl;
    } else {
      return "https://via.placeholder.com/500"; 
    }
  };

  return (
    <div className="w-full mx-auto mt-40 p-6 bg-white shadow-sm rounded-sm">
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4">
          {/* Thumbnail images */}
          {product?.images &&
           (product.images).map((item, index) => (
              <Image
                key={index}
                src={getValidImageSrc(item)} 
                alt="product image"
                height={200}
                width={200}
                className={`w-24 h-24 object-contain cursor-pointer opacity-80 hover:opacity-100 duration-100 border-gray-200 mb-1 p-1 ${
                  currentImage === item ? "border-gray-500 opacity-100" : ""
                }`}
                onClick={() => setCurrentImage(item)} 
              />
            ))}
        </div>
        
        {/* Main product image */}
        <div className="bg-gray-100 rounded-md ml-5 w-full max-h-[550px]">
          <Image
            src={`https://fastdeals.ecommatrix.xyz/storage/app/public/product/${product.images}`} 
            alt="productImage"
            width={500}
            height={500}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="md:w-2/3 p-6">
          <p className="text-sm text-gray-600 mb-4">{product?.meta_title}</p>
          <span className="text-sm text-gray-500">
            {product?.reviews_count} reviews
          </span>
          <span className="text-3xl font-bold text-gray-900">
            ৳ {product?.unit_price}
          </span>
          <p className="text-gray-700 mt-4">{product?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Singlecatproductdetails;
