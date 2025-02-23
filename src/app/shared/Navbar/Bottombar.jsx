"use client";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { FiUser, FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import Image from "next/image";

const Bottombar = ({ user, logout, categories }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Ensure categories is always an array and limit to 6 items
  const setCategories = Array.isArray(categories) ? categories.slice(0, 6) : [];

  return (
    <div>
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="relative bg-white w-3/4 h-full p-4 overflow-y-auto">
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
              {setCategories.map((category) => (
                <li key={category.id} className="hover:text-red-400">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      setExpandedCategory(expandedCategory === category.id ? null : category.id)
                    }
                  >
                    <Link href={category.link || "#"} onClick={() => setShowMobileMenu(false)}>
                      {category.name}
                    </Link>
                    {category.childes?.length > 0 && (
                      <span className="text-sm text-gray-500">
                        {expandedCategory === category.id ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                  {expandedCategory === category.id && category.childes?.length > 0 && (
                    <ul className="ml-4 mt-2 space-y-2 border-l pl-2">
                      {category.childes.map((child) => (
                        <li key={child.id} className="hover:text-red-600">
                          <Link href={child.link || "#"}>{child.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <hr className="m-1 bg-[#F2F2F2]" />

      {/* Desktop Bottom Navigation */}
      <ul className="hidden lg:flex justify-center space-x-6 text-gray-700 text-sm font-medium mt-1">
        <li className="hover:text-purple-600">
          <Link href="/">Home</Link>
        </li>
        {setCategories.map((category) => (
          <li
            key={category.id}
            className="relative group"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <p className="hover:text-red-400 cursor-pointer">{category.name}</p>
            {hoveredCategory === category.id && category.childes?.length > 0 && (
              <div className="absolate mt-2 bg-white shadow-sm rounded-lg p-4 grid grid-cols-3 gap-2 w-[1200px]">
                <div className="">
                  <Image
                    className="w-[200px] h-[200px] object-cover rounded-md"
                    src="https://res.cloudinary.com/dluuillmt/image/upload/v1740204378/discount_sukhcy.jpg"
                    alt="Left Image"
                    width={200}
                    height={200}
                  />
                </div>
                <ul className="col-span-1 space-y-2 grid grid-cols-3 gap-2">
                  {category.childes.map((child) => (
                    <li key={child.id} className="hover:bg-gray-100 p-2 rounded-md">
                      <Link href={child.link || "#"}>{child.name}</Link>
                    </li>
                  ))}
                </ul>
                <div className="">
                  <Image
                    className="w-[200px] h-[200px] object-cover rounded-md"
                    src="https://res.cloudinary.com/dluuillmt/image/upload/v1740205311/explore_shoishob_p3gdbx.jpg"
                    alt="Right Image"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bottombar;
