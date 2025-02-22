"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const singleproduct = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
console.log(slug)
  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fastdeals.ecommatrix.xyz/api/v1/products/details/${slug}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Error loading product details</div>;

  return (
    <div className="grid grid-cols-1 gap-4 rounded-sm overflow-hidden items-center p-4">
      <h1 className="text-lg font-bold">Name: {product.name}</h1>
      <p className="text-lg">Price: {product.unit_price}৳</p>
      {product.image && (
        <img src={product.image} alt={product.name} className="w-64 h-64 object-cover rounded" />
      )}
    </div>
  );
};

export default singleproduct;
