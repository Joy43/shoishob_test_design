"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Loading from "@/app/loading";
import Image from "next/image";
import Button from "@/app/components/Button";
import Link from "next/link";

const CategoryPage = () => {
  const { slug } = useParams(); 
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 console.log(category)
  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    axios
      .get(`https://fastdeals.ecommatrix.xyz/api/v1/categories/products/${slug}`)
      .then((res) => {
        setCategory(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch category data");
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <Loading text="Loading category..." />;
  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 capitalize">{category?.slug}</h1>
      <p className="text-gray-600 mb-6">All Category Here {category.name}</p>

      {category.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {category.map((product) => (
            <div 
              key={product.id} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition duration-300"
            >
              {product.images && (
                <Image
                  width={300}
                  height={300}
                  src={`https://fastdeals.ecommatrix.xyz/storage/app/public/product/${product.images}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
              <h3 className="font-semibold text-lg text-gray-900 mt-2">{product?.name}</h3>
              <div className="text-sm text-gray-600 mt-1"
                dangerouslySetInnerHTML={{ __html: product?.key_features || "" }}
              />
              <div>
                <Link href={`/categoriesdetails/${product.id}`}><Button text="View Detils"></Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No products available in this category</p>
      )}
    </div>
  );
};

export default CategoryPage;