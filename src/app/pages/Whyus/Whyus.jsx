'use client'
import { TbClock } from "react-icons/tb";
import { FaCcAmazonPay } from "react-icons/fa";
import { GiMachineGunMagazine } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";
const WhyUs = () => {
  const reasons = [
    {
      Icon: MdSupportAgent,
      title: "Support 24H",
    },
    {
      Icon: FaCcAmazonPay,
      title: "Best Price",
    },
    {
      Icon: TbClock,
      title: "Fastest Delivery",
    },
    {
      Icon: MdVerified,
      title: "Official Product",
    },
  ];

  return (
    <section className="h-[200px] p-4  ">
      {/* Title */}
      <div className="flex justify-center mt-2 text-2xl font-semibold text-gray-900">
        Why choise Us?
      </div>

      {/* Container */}
      <div className="container shadow-sm mx-auto ">
        <div className="grid  grid-cols-4 lg:gap-6 sm:gap-2 text-center">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="p-4 transform transition duration-500 hover:scale-110"
            >
              <div className="flex justify-center ">
              <reason.Icon 
                  className="w-10 h-10 mb-4 text-[#2B2D42]" 
                  aria-hidden="true"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                {reason.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
