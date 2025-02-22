"use client";

import React, { useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdFavoriteBorder,MdOutlineForwardToInbox,MdOutlineSupportAgent  } from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";
import logo from "../../../../public/logo.svg"
const usermenuList = [
  { id: 1, name: "My Profile", icon: FaUser, path: "address" },
  { id: 2, name: "Cart", icon: RiShoppingCartLine, path: "cart" },
  { id: 3, name: "Wishlist", icon: MdFavoriteBorder, path: "wishlist" },
  { id: 4, name: "Orders", icon: IoBagCheckOutline, path: "orders" },
  { id: 5, name: "Inbox", icon: MdOutlineForwardToInbox , path: "inbox" },
  { id: 6, name: "Support Ticket", icon: MdOutlineSupportAgent , path: "support" },
  { id: 7, name: "Home", icon: FaHome, path: "/" },
];

export default function UserSidebarNav() {
  const [activeIndex, setActiveIndex] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  const handleNavigation = (path, index) => {
    setActiveIndex(index);
    router.push(path.startsWith("/") ? path : `/${path}`);
  };

  return (
    <div className=" w-[180px] bg-gray-800 md:block min-h-screen">

      {/* Sidebar Menu */}
      <div className="flex flex-col py-6">
        {usermenuList.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 cursor-pointer transition-all duration-300 transform ${
              activeIndex === index
                ? "bg-[#292A3A] scale-95 shadow-md text-red-500"
                : " text-gray-300 hover:bg-[#3A3B50] hover:text-red-400 hover:scale-100"
            }`}
            onClick={() => handleNavigation(item.path, index)}
          >
            <item.icon className="text-lg" />
            <h2 className="font-lg">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
