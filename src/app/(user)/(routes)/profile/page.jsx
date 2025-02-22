"use client";
import {  FaRegHeart, FaWallet, FaRegEdit, FaDatabase } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { useAuth } from "@/app/hooks/useAuth";
import { useShop } from "@/app/hooks/useShop";


import Link from "next/link";

function Profile() {
  const { user,  logout } = useAuth();
  const {wishlist,cart}=useShop();
  console.log(user);
  const stats = [
    { icon: <IoIosCart className="h-12 w-12 text-white" />, bgColor: "bg-green-400", title: "Total order", value: "12" },
    { icon: < FaRegHeart className="h-12 w-12 text-white" />, bgColor: "bg-blue-400", title: "Total wishList", value: "39,265" },
    { icon: <FaWallet className="h-12 w-12 text-white" />, bgColor: "bg-indigo-400", title: "Wallet", value: "142" },
    { icon: <FaDatabase className="h-12 w-12 text-white" />, bgColor: "bg-red-400", title: "Server Load", value: "34.12%" }
  ]

  return (
    <div className=" min-h-screen gap-4  items-center justify-center p-4">

      {/* ------product info----- */}

      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-8">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className={`p-4 ${stat.bgColor}`}>{stat.icon}</div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">{stat.title}</h3>
            <p className="text-3xl">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
{/* -------------user infomation-------- */}
      <div className="bg-[#F6F6F6] mt-6 rounded-lg shadow-lg max-w-4xl w-full  transition-all duration-300 animate-fade-in">
  
       <div className="md:w-2/3 md:pl-8">
            <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-gay-800">
              Personal Information
            </h2>
{/* -------edit profile button-------------- */}
            <Link
              href="/editprofile"
              className=" rounded-2xl gap-2 flex items-center  m-2 border-2 border-gray-600 text-gray-900 px-6 py-2 duration-300"
            >
              Edit Profile
              <FaRegEdit className="text-xl"/>
            </Link>
            </div>
            {/*------------- user info chart ------------------*/}
            <div className="grid grid-cols-2 text-gray-700">
            <div className="grid gap-4">
              <li className="flex items-center text-md">
                <span className="mr-2">First Name:</span>
                {user?.f_name}
              </li>
              <li className="flex items-center text-md">
                <span className="mr-2">Last Name:</span>
                {user?.l_name}
              </li>
              </div>

              <div className="grid gap-4">
              <li className="flex items-center text-md">
                <span className="mr-2">📧</span>
                {user?.email}
              </li>
              <li className="flex items-center text-md">
                <span className="mr-2">📞</span>
                {user?.phone}
              </li>
              </div>
              
            </div>
            <p className="text-center p-2 text-md">
                <span className="">📍</span>
                Dhaka, Bangladesh
              </p>
          </div>
        </div>
        {/* -----------address adding--------- */}

        <div className="p-4 mt-6 flex justify-between rounded-sm shadow-sm bg-slate-200 ">
          <p>My Addresses</p>
          {/* <Link
  href="/address"
  className="rounded-2xl flex items-center gap-2 m-2 border-2 border-black text-gray-900 px-6 py-2 duration-300 hover:text-white hover:bg-slate-800"
>
Add Address
  <CiLocationOn className="text-xl" />
</Link> */}

        </div>
      </div>
  
  );
}

export default Profile;
