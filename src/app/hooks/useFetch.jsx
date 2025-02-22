"use client";
import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "https://fastdeals.ecommatrix.xyz/api/v1";

// --------------- Generic fetch hook ---------
const useFetch = (endpoint, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        cache: "no-store",
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [endpoint, method, body]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchData };
};

// ------------------ Products API---------------
export const useLatestProducts = () => useFetch("products/latest");
export const useFeaturedProducts = () => useFetch("products/featured");
export const useTopRatedProducts = () => useFetch("products/top-rated");
export const useProductDetails = (slug) => useFetch(`products/details/${slug}`);
export const useProductReviews = (productId) => useFetch(`products/reviews/${productId}`);
export const useBestSellingProducts = () => useFetch("products/best-sellings");
export const useMostDemandedProduct = () => useFetch("products/most-demanded-product");

//----------- Submit Review (Separate API call)-----------------
export const submitProductReview = async (reviewData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/reviews/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) throw new Error("Failed to submit review");
    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

//---------- Categories API------------
export const useAllCategories = () => useFetch("categories");
export const useCategoryProducts = (categoryId) => useFetch(`categories/products/${categoryId}`);
export const useFindWhatYouNeed = () => useFetch("categories/find-what-you-need");
