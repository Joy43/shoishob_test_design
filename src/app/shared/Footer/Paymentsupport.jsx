import Image from "next/image";

const paymentLogos = [
  "/images/paylogo/bikas.png",
  "/images/paylogo/Nagad.png",
  "/images/paylogo/visacard.png",
  "/images/paylogo/dutchbangla.png",
  "/images/paylogo/rocket.png",
  "/images/paylogo/mastercard.png",

  
  
];

const Paymentsupport = () => {
  return (
    <div className="">
      {/* Payment Hours */}
      <div className="flex px-4 flex-col md:flex-row md:items-center gap-2 border-b pb-3">
        <h1 className="text-black font-semibold text-lg">Business Hours:</h1>
        <p className="text-gray-600 text-sm md:ml-2">
          9:00 AM - 7:30 PM | Saturday to Thursday
        </p>
      </div>

      {/* Payment Logos */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 place-items-center mt-5">
        <p  className="text-gray-800 ">Pay With <span className="border-r-4 border-gray-800  m-4 h-6"></span></p>
        {paymentLogos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md w-20 h-14 transition-all duration-300"
          >
            <Image
              src={logo}
              width={70}
              height={70}
              alt={`Payment logo ${index}`}
              className="object-contain contrast-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paymentsupport;
