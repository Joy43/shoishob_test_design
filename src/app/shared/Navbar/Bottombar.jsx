'use client';
import { useState } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { FiUser, FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

const Bottombar = ({ user, logout, categories }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Ensure categories is always an array and limit to 6 items
  const safeCategories = Array.isArray(categories) ? categories.slice(0, 6) : [];

  return (
    <div>
      {/*-------------- Mobile Menu -------------------*/}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="relative bg-white w-3/4 h-full p-4">
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={() => setShowMobileMenu(false)}
            >
              <AiOutlineClose />
            </button>
            <ul className="mt-8 space-y-4">
              <li className="hover:text-purple-600">
                <Link href="/" onClick={() => setShowMobileMenu(false)}>
                  Home
                </Link>
              </li>
              {safeCategories.map((category) => (
                <li key={category.id} className="hover:text-red-400">
                  <Link href={category.link || "#"} onClick={() => setShowMobileMenu(false)}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t pt-4">
              {user ? (
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <FiUser /> Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="flex items-center gap-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <div className="hidden md:flex items-center gap-2">
                    <FaUser className="text-2xl" />
                    <div>
                      <h1 className="text-sm text-gray-500">Account</h1>
                      <p className="text-md font-semibold text-gray-900">
                        Login or Signup
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <hr className="m-1 bg-[#F2F2F2]" />

      {/*--------- Desktop Bottom Navigation -----------*/}
      <ul className="hidden lg:flex justify-center space-x-6 text-gray-700 text-sm font-medium mt-1">
        <li className="hover:text-purple-600">
          <Link href="/">Home</Link>
        </li>
        {safeCategories.map((category) => (
          <li key={category.id} className="hover:text-red-400">
            <Link href={category.link || "#"}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bottombar;
