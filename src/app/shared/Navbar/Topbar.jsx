import { IoChevronDownCircleSharp } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdFavoriteBorder, MdWifiCalling1 } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { TbCoinTaka } from "react-icons/tb";
import Link from "next/link";
const Topbar = () => {
  return (
    <div>
   {/*-------------- Topbar ----------*/}
   <div className=" bg-[#2B2D42] flex items-center justify-between px-1 ">
        <p className="hideen w-full md:w-auto text-white font-medium md:text-sm
       lg:text-sm flex items-center justify-center md:justify-normal px-4 py-1">
        <CiDeliveryTruck className=" text-orange-400 text-2xl mr-1"/>
        40+ outlets nationwide with international delivery</p>
        <div className="hidden md:inline-flex items-center text-white">
        <p className="headerTopMenu ">01701677162 <MdWifiCalling1/></p>
          <p className="headerTopMenu ">English <IoChevronDownCircleSharp/></p>
          <p className="headerTopMenu ">Taka<TbCoinTaka/></p>
        </div>
      </div>
      {/* -----------middle bar--------- */}
 {/* Middle Bar - Hidden on mobile */}
 <div className="hidden md:flex justify-between py-2 px-2 md:px-6 bg-gray-50 w-full ">
        <p className="text-sm">Salling Life</p>
        <ul className="flex gap-4 text-sm">
          <li className="hover:text-red-400">
            <Link href="/contact">About us</Link>
          </li>
         
          <li className="hover:text-purple-600">
            <Link href="/compare">Compare(0)</Link>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default Topbar