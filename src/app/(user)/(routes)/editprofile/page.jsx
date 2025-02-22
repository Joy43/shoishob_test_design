"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";

function EditProfile({ onClose }) {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
  f_name: "",
  l_name: "",
  phone: "",
  image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        f_name: user.f_name || "",
        l_name: user.l_name || "",
        phone: user.phone || "",
        image: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    if (!formData.f_name || !formData.l_name || !formData.phone) {
      setErrorMessage("All fields are required.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("f_name", formData.f_name);
      formDataToSend.append("l_name", formData.l_name);
      formDataToSend.append("phone", formData.phone);
      if (formData.image) formDataToSend.append("image", formData.image);

      await axios.put(
        "https://fastdeals.ecommatrix.xyz/api/v1/customer/update-profile",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-slate-300 bg-opacity-50  items-center justify-center ">
      <div className="bg-white p-6 rounded-xl shadow-sm  max-w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="f_name"
              value={formData.f_name}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="l_name"
              value={formData.l_name}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>

          {previewImage && (
            <div className="flex justify-center mt-3">
              <Image
                src={previewImage}
                alt="Preview"
                width={100}
                height={100}
                className="rounded-full border border-gray-300 shadow-md"
              />
            </div>
          )}

          {errorMessage && (
            <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
          )}

          <div className="flex justify-between mt-6">
            <Link
              href="/profile"
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
