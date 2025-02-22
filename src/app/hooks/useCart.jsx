"use client";

import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";

const API_BASE_URL = "https://fastdeals.ecommatrix.xyz/api/v1";

// Create Cart Context
const CartContext = createContext(null);

// Custom Hook to Use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Cart Data when Token is Available
  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  // Fetch Cart Items
  const fetchCart = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-store",
        },
      });
      setCart(response.data || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError(err.response?.data?.message || "Failed to load cart");
    }
    setLoading(false);
  };

  // Add Item to Cart
    // Add Item to Cart
    const addToCart = async (productId, quantity = 1) => {
      if (!token) {
        alert("Please login to add items to cart");
        return;
      }
  
      // Validate input
      if (!productId) {
        setError("Product ID is required!");
        return;
      }
      if (!quantity || quantity <= 0) {
        setError("Quantity must be at least 1!");
        return;
      }
  
      try {
        const requestData = { product_id: productId, quantity };
        console.log("Adding to cart:", requestData); // Debugging log
  
        await axios.post(`${API_BASE_URL}/cart/add`, requestData, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        fetchCart();
      } catch (err) {
        console.error("Error adding to cart:", err);
        setError(err.response?.data?.message || "Could not add item to cart");
      }
    };
  
    // Update Cart Item Quantity
    const updateCartItem = async (productId, quantity) => {
      if (!token) return;
  
      // Validate input
      if (!productId) {
        setError("Product ID is required!");
        return;
      }
      if (!quantity || quantity <= 0) {
        setError("Quantity must be at least 1!");
        return;
      }
  
      try {
        await axios.put(
          `${API_BASE_URL}/cart/update`,
          { product_id: productId, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchCart();
      } catch (err) {
        console.error("Error updating cart item:", err);
        setError(err.response?.data?.message || "Could not update item in cart");
      }
    };
  
    // Remove Item from Cart
    const removeFromCart = async (productId) => {
      if (!token) return;
  
      // Validate input
      if (!productId) {
        setError("Product ID is required!");
        return;
      }
  
      try {
        await axios.delete(`${API_BASE_URL}/cart/remove`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { product_id: productId },
        });
        fetchCart();
      } catch (err) {
        console.error("Error removing item from cart:", err);
        setError(err.response?.data?.message || "Could not remove item from cart");
      }
    };
  
    // Clear Entire Cart
    const clearCart = async () => {
      if (!token) return;
  
      try {
        await axios.delete(`${API_BASE_URL}/cart/remove-all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart([]); // Reset local cart state
      } catch (err) {
        console.error("Error clearing cart:", err);
        setError(err.response?.data?.message || "Could not clear cart");
      }
    };
  return (
    <CartContext.Provider value={{ cart, loading, error, addToCart, updateCartItem, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
