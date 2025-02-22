"use client";
import { FaAngleRight } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAllCategories, useCategoryProducts } from "@/app/hooks/useFetch";
import Image from "next/image";
import Link from "next/link";

const Categoriesproduct = () => {
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get("category");

  const { data: categories, loading: categoriesLoading, error: categoriesError } = useAllCategories();
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL || null);
  const { data: products, loading: productsLoading, error: productsError } = useCategoryProducts(selectedCategory);

  useEffect(() => {
    setSelectedCategory(categoryFromURL);
  }, [categoryFromURL]);

  return (
    <div className="p-4 mt-40">
      {/* Category Selection for Small Devices */}
      <div className="md:hidden mb-4">
        <label className="block text-sm font-medium mb-1">Select Category</label>
        <select
          className="w-full p-2 border rounded-lg"
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar for Larger Screens */}
        <div className="hidden md:block md:w-1/4 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Categories</h2>
          {categoriesLoading && <p>Loading categories...</p>}
          {categoriesError && <p>Error loading categories</p>}
          {categories && (
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`cursor-pointer p-2 rounded-lg ${
                    selectedCategory === category.id ? "bg-red-500 text-white" : "bg-white text-black"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="inline-flex gap-2">
                    {category.name}
                    <FaAngleRight className="text-lg" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Products Section */}
        <div className="w-full md:w-3/4 p-4">
          {productsLoading && <p>Loading products...</p>}
          {productsError && <p>Error loading products</p>}
          {products && products.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
                  <div className="relative">
                    <Image
                      width={400}
                      height={400}
                      src={`https://fastdeals.ecommatrix.xyz/storage/app/public/product/${product.images}`}
                      alt={product.name}
                      className="w-full object-cover rounded-md"
                    />
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md font-medium">
                      Sale
                    </div>
                  </div>
                  <div className="p-4 grid gap-2">
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-lg">{product.unit_price}৳</p>
                      <Link
                        href={`/categories/singlecatproduct/${product.slug}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categoriesproduct;
