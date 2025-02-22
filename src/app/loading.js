

import React from "react";

import loadingsvg from "../../public/logo.svg";
import Image from "next/image";
const Loading = ({ text = "" }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image className="contrast-150" src={loadingsvg} alt=" shoishob Loading..." width={400} height={400} />
      <p className="mt-2 text-lg font-semibold text-gray-700">{text}</p>
    </div>
  );
};

export default Loading;


