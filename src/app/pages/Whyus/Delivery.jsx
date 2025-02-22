import Image from 'next/image';
import delevary from "../../../../public/images/delevary/delevari.webp";
import special from "../../../../public/images/delevary/special.webp";

export const Delivery = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center p-4">
      <div className="w-full max-w-[678px]">
        <Image 
          src={delevary}
          width={678}
          height={142}
          className="w-full h-auto object-cover "
          alt="Delivery"
        />
      </div>
      <div className="w-full max-w-[678px] -ml-px lg:-ml-0">
        <Image 
          src={special}
          width={678}
          height={142}
          className="w-full h-auto object-cover "
          alt="Special"
        />
      </div>
    </div>
  );
};
