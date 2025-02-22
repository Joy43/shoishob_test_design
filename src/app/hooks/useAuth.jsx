"use client";

import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const API_BASE_URL = "https://fastdeals.ecommatrix.xyz/api/v1";
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const decodeToken = (token) => {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const decodedToken = decodeToken(token);
    if (decodedToken?.exp * 1000 < Date.now()) {
      logout();
      return;
    }

    fetchUserInfo(token);
  }, [token]);

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customer/info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load user info. Please try again.");
      setLoading(false);
    }
  };

  const login = async (email, password, guest_id = "1") => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { email, password, guest_id },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      fetchUserInfo(token);
    } catch (error) {
      console.error("Login Error:", error);
      setError("Login failed. Please check your credentials.");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
