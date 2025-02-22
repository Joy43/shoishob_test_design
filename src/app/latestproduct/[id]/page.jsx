'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Loading from '@/app/loading';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get("https://fastdeals.ecommatrix.xyz/api/v1/products/latest");
        const matchedProduct = res.data.products?.find((prod) => prod.id === parseInt(id));

        if (matchedProduct) {
          setProduct(matchedProduct);
          setMainImage(matchedProduct.images[0]);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error("Error fetching product details:", err.response || err.message);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductDetails();
  }, [id]);

  const changeImage = (imageSrc) => {
    setMainImage(imageSrc);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (loading) return <Loading text="Fetching product details..." />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* ---------------  Product Images -----------------------*/}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <Image
              src={product?.thumbnail
                ? `https://fastdeals.ecommatrix.xyz/storage/app/public/product/thumbnail/${product.thumbnail}`
                : '/images/default-placeholder.png'}
              alt={product?.name || 'Product Image'}
              className="w-full h-auto rounded-lg shadow-md mb-4"
              width={400}
              height={300}
            />
            {/* ------slide image------------ */}
            <div className="flex gap-4 py-2 justify-center overflow-x-auto">
              {product?.images?.map((image, index) => (
                <Image
                  key={index}
                  src={`https://fastdeals.ecommatrix.xyz/storage/app/public/product/${image}`}
                  width={300}
                  height={300}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 sm:w-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => changeImage(image)}
                />
              ))}
            </div>
          </div>

          {/*----------  Product Details -------------------*/}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-2xl font-bold mb-2">{product?.name}</h2>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">৳ {product?.unit_price}</span>
              {product?.discount && (
                <span className="text-gray-500 line-through">{`৳ ${product?.unit_price + (product.unit_price * (product.discount / 100))}`}</span>
              )}
            </div>
            <p className="text-gray-600 mb-4">SKU: {product?.product_type || 'N/A'}</p>

            {/* ------------ Key Feature ---------------*/}
            <div className="gap-2">
              <p className="text-lg font-serif font-semibold">Key Feature</p>
              <div className="text-sm text-gray-600 mt-1"
                dangerouslySetInnerHTML={{ __html: product?.key_features || "" }}></div>
              <div className="text-sm text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: showFullDescription ? product?.details : (product?.details?.slice(0, 500) + '...') }}></div>
              <button
                className="text-orange-600 text-sm mt-2"
                onClick={toggleDescription}>
                {showFullDescription ? 'See Less' : 'See More'}
              </button>
            </div>

            {/*----------  Quantity Input -------------*/}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value="1"
                className="w-12 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/*---------  Add to Cart Button -----------------*/}
            <div className="flex space-x-4 mb-6">
              <button className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1..."
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
