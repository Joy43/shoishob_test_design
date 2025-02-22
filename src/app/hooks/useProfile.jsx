"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";


const API_BASE_URL = "https://fastdeals.ecommatrix.xyz/api/v1";

const useProfile = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    f_name: "",
    l_name: "",
    phone: "",
    email: "",
    image: "def.png",
    street_address: "",
    country: "",
    city: "",
    zip: "",
    house_no: "",
    apartment_no: "",
  });

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch user profile data
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API_BASE_URL}/customer/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setErrorMessage("Failed to fetch profile data.");
        setLoading(false);
      });
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const updateProfile = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.put(
        `${API_BASE_URL}/customer/update-profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage("Profile updated successfully!");
      setFormData(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update profile.");
    }
  };

  return {
    formData,
    loading,
    successMessage,
    errorMessage,
    handleChange,
    updateProfile,
  };
};

export default useProfile;
