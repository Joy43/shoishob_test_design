'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdEyeOff } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';
import logo from '../../../../public/logo.svg';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://fastdeals.ecommatrix.xyz/api/v1/auth/register";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: '1', 
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        API_BASE_URL,
        {
          f_name: formData.firstName,
          l_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          referral_code: formData.referralCode,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("API Response:", response.data);
      
      // Save token to localStorage
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        toast.success("Registration successful!");

        // Redirect to home page
        router.push('/signin');
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed!");
      toast.error(error.response?.data?.message || "Registration failed!")
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0b020f] to-[#fcfcfc] px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src={logo} width={120} height={100} alt="Shoishob Logo" />
        </div>

        <h1 className="text-3xl font-semibold text-center text-gray-800">Create an Account</h1>
        <p className="text-center text-gray-600 mb-6">
          Already have an account?{' '}
          <Link href="/signin" className="text-indigo-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="First Name" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} />
          <InputField label="Last Name" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
          <InputField label="Email" name="email" type="email" placeholder="example@gmail.com" value={formData.email} onChange={handleChange} />
          <InputField label="Phone" name="phone" type="tel" placeholder="+1234567890" value={formData.phone} onChange={handleChange} />
          <PasswordInput label="Password" name="password" value={formData.password} onChange={handleChange} showPassword={showPassword} toggleVisibility={togglePasswordVisibility} />
          <PasswordInput label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} showPassword={showConfirmPassword} toggleVisibility={toggleConfirmPasswordVisibility} />

          <div className="md:col-span-2 flex justify-center">
            <button 
              type="submit" 
              className="w-full md:w-auto px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable Input Field Component
const InputField = ({ label, name, type = "text", placeholder, value, onChange }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
    <input 
      type={type} 
      name={name} 
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-150" 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 
      required 
    />
  </div>
);

// Reusable Password Input Component
const PasswordInput = ({ label, name, value, onChange, showPassword, toggleVisibility }) => (
  <div className="relative">
    <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
    <input 
      type={showPassword ? "text" : "password"} 
      name={name} 
      className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-150" 
      placeholder="Enter your password" 
      value={value} 
      onChange={onChange} 
      required 
    />
    <button 
      type="button" 
      className="absolute top-[50%] right-4 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition" 
      onClick={toggleVisibility}
    >
      {showPassword ? <FaEye /> : <IoMdEyeOff />}
    </button>
  </div>
);
