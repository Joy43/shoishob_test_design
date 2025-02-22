"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaTwitter,  FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import Image from "next/image";
import logo from "../../../../public/logo.svg";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await login(email, password, "1");
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login error. ",error);
      
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        {/* Header with logo */}
        <div className="text-center">
          <Image className="mx-auto contrast-125" width={150} height={100} src={logo} alt="Shoishob Logo" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Login your account</h2>
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link className="text-blue-500 font-serif font-semibold" href="/signup">
              Sign up
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoMdEyeOff className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              Remember me
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-[#2B2D42] hover:bg-indigo-700 rounded-lg shadow-md"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">Or sign in with</div>

        <div className="mt-4 flex justify-center gap-4">
          <button className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700">
            <FaGoogle className="w-5 h-5" />
          </button>
         
          
        </div>
      </div>
    </div>
  );
}
