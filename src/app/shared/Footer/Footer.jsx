import Image from "next/image";

import { FaYoutube,FaGooglePlay } from "react-icons/fa";
import Paymentsupport from "./Paymentsupport";
import Contactfooter from "./Contactfooter";


export default function Footer() {
  return (
    <div className=" mt-8 ">

      {/*---------- Payment Info ---------------*/}
   <Paymentsupport/>

 
      {/*------------ Contact Info -------------*/}
   
      <Contactfooter/>
      {/*------------ Footer Section ------------*/}
      <footer className=" p-4 text-white bg-[#2B2D42]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/*------------ first path---------- */}
          <div>
            <h2 className="text-xl font-bold ">Our Company</h2>
            <p className="mt-4 text-lg ">Shoishob is a leading kids fashion brand in Bangladesh that represents style and quality since 2008, mostly distinguished for its true our own quality designs and fabrics. Shoishob aspires to deliver what every kid’s wardrobe needs.</p>
          </div>
          {/* ---------second part-------------- */}
          <div>
            <h2 className="text-xl font-bold ">Customer Services</h2>
            <ul className="mt-4 text-lg space-y-2">
              {["Contact Us", "Fabric Care", "Store Locator", "Terms & Conditions"].map((item, index) => (
                <li key={index}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>
          {/* ------third part----------- */}
          <div>
            <h2 className="text-xl font-bold ">Our Categories</h2>
            <ul className="mt-4 text-lg  space-y-2">
              {["Baby Collection", "Girls Collection", "Boys Collection"].map((item, index) => (
                <li key={index}><a href="#">{item}</a></li>
              ))}
            </ul>
          </div>
          {/* ------------contact us---------- */}
      <div className="max-w-sm mx-auto text-center">
  <h2 className="text-xl font-bold">Contact Us</h2>

  <div className="mt-4 space-y-2">
    <p className="text-lg">
      Email: 
      <a href="mailto:info@shoishobbd.com" className=" hover:underline ml-1">
        info@shoishobbd.com
      </a>
    </p>
    <p className="text-lg">
      Phone: 
      <a href="tel:+8802 55058350" className=" hover:underline ml-1">
        +8802 55058350
      </a>
    </p>
  </div>

  {/* ----YouTube & PlayStore Links------ */}
  <div className="flex justify-center items-center gap-6 mt-5">
    <a 
      href="https://play.google.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-white transition duration-300 text-2xl"
    >
      <FaGooglePlay />
    </a>
    <span className="w-px h-6 "></span>
    <a 
      href="https://youtube.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-white transition duration-300 text-2xl"
    >
      <FaYoutube />
    </a>
  </div>
</div>
 </div>
<hr className="bg-[#3B3D56] border-dotted boder-1 mt-4"/>
        <div className="flex P-4 items-center justify-between gap-4  mt-4 text-lg ">
          <p>Copyright 2025 © Shoishob Fashion Ltd. All rights reserved.</p>
          <p>system design & developed by :  <span className="text-red-400">NI Brizz soft</span></p>
        </div>
      </footer>
    </div>
  );
}
