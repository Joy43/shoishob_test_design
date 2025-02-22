"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";
import { toast } from "react-hot-toast";

const API_BASE_URL = "https://fastdeals.ecommatrix.xyz/api/v1";
const ShopContext = createContext(null);

export const useShop = () => useContext(ShopContext);
export const ShopProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      fetchCart();
      fetchWishlist();
    }
  }, [token]);

  const handleApiError = (err, message) => {
    console.error(message, err);
    const errorMessage = err.response?.data?.message || message;
    setError(errorMessage);
    toast.error(errorMessage);
  };

  const fetchCart = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      setCart(data || []);
    } catch (err) {
      handleApiError(err, "Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchWishlist = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/customer/wish-list`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      setWishlist(data || []);
    } catch (err) {
      handleApiError(err, "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  }, [token]);
  
// -------------- addToCart-----------------
const addToCart = async (productId, quantity = 1) => {
  if (!token) {
    toast.error("Please login to add items to cart");
    return;
  }

  // Create FormData object
  const formData = new FormData();
  formData.append("_token", token);
  formData.append("id", productId);
  formData.append("quantity", quantity);

  try {
    await axios.post(`${API_BASE_URL}/cart/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Item added to cart!");
    fetchCart();
  } catch (err) {
    console.error("Cart Error:", err.response?.data || err.message);
    handleApiError(err, "Could not add item to cart");
  }
};

// --------remove from cart-------
const removeFromCart = async (productId) => {
  if (!token) return;

  try {
    await axios.delete(`${API_BASE_URL}/cart/remove`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { key: productId }, 
    });

    toast.success("Item removed from cart!");
    fetchCart();
  } catch (err) {
    handleApiError(err, "Could not remove item from cart");
  }
};

// -----------update cart-----

  const updateCartItem = async (productId, quantity) => {
    if (!token) return;

    try {
      await axios.put(
        `${API_BASE_URL}/cart/update`,
        { product_id: productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Cart updated!");
      fetchCart();
    } catch (err) {
      handleApiError(err, "Could not update item in cart");
    }
  };


  const clearCart = async () => {
    if (!token) return;

    try {
      await axios.delete(`${API_BASE_URL}/cart/remove-all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Cart cleared!");
      setCart([]);
    } catch (err) {
      handleApiError(err, "Could not clear cart");
    }
  };

  // ----------add to wishl--------------
  const addToWishlist = async (productId) => {
    if (!token) return toast.error("Please login to add items to wishlist");

    try {
      await axios.post(
        `${API_BASE_URL}/customer/wish-list/add`,
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Item added to wishlist!");
      fetchWishlist();
    } catch (err) {
      handleApiError(err, "Could not add item to wishlist");
    }
  };

  // -------------- removeFromWishlist ---------------
  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/customer/wish-list/remove`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { product_id: productId },
      });
      toast.success("Item removed from wishlist!");
      fetchWishlist();
    } catch (err) {
      handleApiError(err, "Could not remove item from wishlist");
    }
  };

  const toggleWishlist = async (productId, isInWishlist) => {
    if (!token) return toast.error("Please login to modify wishlist");

    try {
      isInWishlist ? await removeFromWishlist(productId) : await addToWishlist(productId);
    } catch (err) {
      handleApiError(err, "Could not update wishlist");
    }
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
