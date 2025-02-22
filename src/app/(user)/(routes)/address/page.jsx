"use client";

import { useState } from "react";
import toast from "react-hot-toast"; 
import { FiUser, FiMapPin, FiPhone } from "react-icons/fi";
import { useAuth } from "@/app/hooks/useAuth";

const AddAddressForm = () => {
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth();

  if (!token) {
    toast.error("You are not authorized. Please log in.");
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    let data = Object.fromEntries(formData);
    
    if (user) {
      data.guest_id = 102;
      data.email = user.email;
      data.is_billing = true;
    }

    // Default latitude/longitude
    data.latitude = data.latitude || "23.8103";
    data.longitude = data.longitude || "90.4125";

    console.log("Sending Data:", data);

    try {
      const response = await fetch(
        "https://fastdeals.ecommatrix.xyz/api/v1/customer/address/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
          cache: "no-store",
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to add address");

      toast.success("Address added successfully!");
      event.target.reset();
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md  mx-auto">
      <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
        Personal Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Contact Person Name */}
        <div className="relative">
          <label htmlFor="contact_person_name" className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <FiUser className="absolute left-3 top-8 text-gray-500" />
          <input
            id="contact_person_name"
            type="text"
            name="contact_person_name"
            placeholder="Contact Person"
            className="w-full border p-2 pl-10 rounded"
            required
          />
        </div>

        {/* Address Type */}
        <div className="relative">
          <label htmlFor="address_type" className="block text-sm font-medium text-gray-700">
            Address Type
          </label>
          {/* <FiMapPin className="absolute left-3 top-8 text-gray-500" /> */}
          <select id="address_type" name="address_type" className="w-full border p-2 pl-10 rounded">
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Permanent">Permanent</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Address */}
        <div className="relative">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <FiMapPin className="absolute left-3 top-8 text-gray-500" />
          <input
            id="address"
            type="text"
            name="address"
            placeholder="Address"
            className="w-full border p-2 pl-10 rounded"
            required
          />
        </div>

        {/* City & ZIP Code */}
        <div className="grid grid-cols-2 gap-4">
         <div className="relative">
          <label className="block text-gray-700 text-sm font-medium mb-2" for="city">
        City
          </label>
          <input type="text" name="city" placeholder="City" className="w-full border p-2 rounded" required />
         </div>
         
{/* --------zip code------- */}
<div className="relative">
<label className="block text-gray-700 text-sm font-medium mb-2">
Zip code
</label>
<input type="text" name="zip" placeholder="ZIP Code" className="w-full border p-2 rounded" required />
</div>

        </div>

        {/* Phone Number */}
        <div className="relative">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <FiPhone className="absolute left-3 top-8 text-gray-500" />
          <input
            id="phone"
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-2 pl-10 rounded"
            required
          />
        </div>

        {/* State & Country */}
        <div className="grid grid-cols-2 gap-4">
          {/* --------zip code------- */}
        <div className="relative">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            State
            
          </label>
          <input type="text" name="state" placeholder="State" className="w-full border p-2 rounded" required />
        </div>
{/* -------country----------- */}
        <div className="relative">
        <label className="block text-gray-700 text-sm font-medium mb-2">
         Country
         <input type="text" name="country" placeholder="Country" className="w-full border p-2 rounded" required />
            
          </label>
        </div>
       
        </div>

        {/* Hidden Fields for Latitude & Longitude */}
        <input type="hidden" name="latitude" />
        <input type="hidden" name="longitude" />

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-[#2B2D42] mx-auto text-white p-2 rounded-md text-center w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default AddAddressForm;
