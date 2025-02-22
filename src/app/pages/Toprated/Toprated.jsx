'use client'
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function Hotproduct() {
  const [hotproduct, setHotProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://fastdeals.ecommatrix.xyz/api/v1/products/top-rated')
      .then((res) => {
        setHotProduct(res.data.products || []); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Top Rated Products</h2>

        {loading ? (
          <p className="text-center text-gray-700 dark:text-white">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotproduct.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
                <div className="h-[300px] rounded-lg overflow-hidden">
                  <Image 
                    src={`https://fastdeals.ecommatrix.xyz/storage/app/public/product/thumbnail/${product?.thumbnail}`} 
                    alt={product?.name} 
                    width={400} 
                    height={300} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2">{product?.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {product?.description}</p>
                <p className="text-gray-800 dark:text-white font-bold mt-2">Price:${product?.unit_price}</p>
                <div className='text-white'
  dangerouslySetInnerHTML={{ __html: product?.key_features }}
></div>
                <div className="flex space-x-2 mt-4">
                  <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                    Add to Cart
                  </button>
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Hotproduct;