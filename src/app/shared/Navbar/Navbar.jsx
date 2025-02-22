"use client";

import { useState, useRef } from "react";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FiUser, FiLogOut } from "react-icons/fi";
import { MdFavoriteBorder, MdWifiCalling1 } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaShopify, FaUser } from "react-icons/fa";
import { PiShoppingBagFill } from "react-icons/pi";
import { useAuth } from "@/app/hooks/useAuth";
import { useShop } from "@/app/hooks/useShop";
import Topbar from "./Topbar";
import Image from "next/image";
import logo from "../../../../public/shoihob.svg";
import Link from "next/link";
import { useAllCategories } from "@/app/hooks/useFetch";
import { FaChevronDown } from "react-icons/fa";
import Bottombar from "./Bottombar";

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const { wishlist, cart } = useShop();
  const { data: categories, loading, error } = useAllCategories();

  // ------ category selection---------------
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); 
    setShowCategories(false);
  };

  // --------------search --------------
  const handleSearchClick = () => {
    if (selectedCategory) {
      // -------- category is selected, navigate to the categories page
      window.location.href = `/categories?category=${selectedCategory.id}`;
    } else {
      alert("Please select a category first.");
    }
  };

  console.log('categories data', categories);

  return (
    <div className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      {/* ------top & middle bar------- */}
      <Topbar />
      <hr className="border-x-2" />
      {/*----------- Navbar main ---------------*/}
      <div className="py-1 px-1 md:px-6 bg-gray-50 w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-around items-center gap-2 md:gap-0">
          {/* ----------Left Section: Logo & Search---------- */}
          <div className="flex items-center gap-4 w-full md:w-auto" ref={dropdownRef}>
            {/*------------ Logo ------------*/}
            <Link href="/" className="flex-shrink-0">
              <Image
                src={logo}
                width={112}
                height={130}
                loading="lazy"
                alt="Shoishob Logo"
                className="contrast-200 h-20 w-30 md:h-16 md:w-36"
              />
            </Link>

            {/*-------------- Search Bar ------------------*/}
            <div className="relative w-full max-w-xl">
              <div className="flex items-center border rounded-full bg-white">
              
                <input
                  type="text"
                  placeholder="Search"
                  className="w-30 px-3 text-gray-800 py-2 rounded-full focus:outline-none"
                />
                {/* --------------Dropdown button for categories-------------- */}
                <div
                onClick={() => setShowCategories(!showCategories)} 
                  className=" sm:flex m-1 items-center gap-1 px-4 py-2 text-sm font-medium rounded-r-full hover:bg-gray-100 transition"
                  
                >
           
          {selectedCategory ? (
            <p className="">{selectedCategory.name}</p>
          ) : (
            <p className="">Categories</p>
          )}
        
            <IoIosArrowDropdownCircle className="text-lg" />
                </div>
{/* --------seach icon-------- */}
                <AiOutlineSearch
                  onClick={handleSearchClick}
                  className="m-3 text-2xl border-l-2   text-gray-800 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/*----------- Right Section: Call, User, Cart -------------*/}
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* ------------ Mobile Menu Button -----------------*/}
            <button
              className="lg:hidden text-2xl text-black hover:text-red-400"
              onClick={() => setShowMobileMenu(true)}
            >
              <AiOutlineMenu />
            </button>

            {/*-----------  User Profile or Sign-in Option -------------*/}
            {user ? (
              <div className="flex items-center">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1"
                >
                  <FaUser className="size-7 bg-slate-200 rounded-full object-cover"></FaUser>
                  <FaChevronDown
                    className={`text-gray-500 transition-transform ${
                      userMenuOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {userMenuOpen && (
                  <div className="absolute mt-48 w-44 bg-white border border-gray-200 rounded-xl shadow-lg animate-fade-in">
                    <Link
                      href="/orders"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-red-500 transition-all duration-200"
                    >
                      <PiShoppingBagFill className="text-lg text-red-400" />
                      <span>My Orders</span>
                    </Link>
                    <Link
                      href="/address"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-red-500 transition-all duration-200"
                    >
                      <FiUser className="text-lg text-red-400" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100 transition-all duration-200"
                    >
                      <FiLogOut className="text-lg" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/signin" className="flex items-center gap-2 p-2 rounded-sm">
                <FaUser className="text-2xl" />
                <div>
                  <h1 className="text-sm text-gray-500">Account</h1>
                  <p className="text-md font-semibold text-gray-900">Login or Signup</p>
                </div>
              </Link>
            )}

            {/*------------- Favorite & Cart Buttons--------------- */}
            <div className="flex items-center gap-4">
              <Link href="/wishlist" className="text-3xl text-red-400 relative">
                <span className="cartIconMenu">{wishlist?.length || "0"}</span>
                <MdFavoriteBorder />
              </Link>
              <Link href="/cart" className="text-3xl relative">
                <span className="cartIconMenu">{cart?.length}</span>
                <MdOutlineShoppingCart />
              </Link>
            </div>
          </div>
        </div>

        {/*----------- Categories Dropdown ------------------*/}
        {showCategories && (
          <div
            className="absolute top-34 left-1/2 transform -translate-x-1/2 w-fit bg-white p-4 rounded-sm shadow-md border border-gray-200 z-10 transition-all duration-300 ease-in-out"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            {loading ? (
              <p className="text-gray-500 text-center py-2">Loading categories...</p>
            ) : error ? (
              <p className="text-red-500 text-center py-2">Failed to load categories</p>
            ) : (
              <div className="grid gap-2 text-gray-700">
                {categories?.map((category) => (
                  <div key={category?.id} className="text-md md:text-lg">
                    <p
                      onClick={() => handleCategorySelect(category)} 
                      className="hover:text-red-500 transition-all duration-300 cursor-pointer"
                    >
                      {category?.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/*------------ Display selected category-------------------- */}
       

        <Bottombar user={user} logout={logout} categories={categories} />
      </div>
    </div>
  );
}

export default Navbar;
