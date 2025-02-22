"use client";

import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useAuth } from "./useAuth"; 
const API_BASE_URL = "https://fastdeals.ecommatrix.xyz/api/v1";
const WishlistContext = createContext(null);

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Wishlist when token is available
  useEffect(() => {
    if (token) fetchWishlist();
  }, [token]);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/customer/wish-list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Wishlist Data:", response.data); 
      setWishlist(response.data || []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
      setError("Failed to load wishlist");
    }
    setLoading(false);
  };
// ---------- addtowishlist ------------
  const addToWishlist = async (productId) => {
    if (!token) return alert("Please login to add items to wishlist");

    try {
      await axios.post(
        `${API_BASE_URL}/customer/wish-list/add`,
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchWishlist(); 
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      setError("Could not add item to wishlist");
    }
  };
// ---------remove wishlist----------
  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/customer/wish-list/remove`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { product_id: productId },
      });
      fetchWishlist();
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
      setError("Could not remove item from wishlist");
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, error, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
