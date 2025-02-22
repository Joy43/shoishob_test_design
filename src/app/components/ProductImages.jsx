'use client'
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <div className="flex float-start">
      <div>
        {images?.map((item, index) => (
          <Image
            key={index}
            src={item}
            alt="product image"
            height={200}
            width={200}
            className={`w-24 h-4 object-contain cursor-pointer opacity-80 hover:opacity-100 duration-100 border-gray-200 mb-1 p-1 ${
              currentImage === item && "border-gray-500 opacity-100"
            }`}
            onClick={() => setCurrentImage(item)}
          />
        ))}
      </div>
      <div className="bg-gray-100 rounded-md ml-5 w-full max-h-[550px]">
        <Image
          src={currentImage}
          alt="productImage"
          width={500}
          height={500}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ProductImages;
