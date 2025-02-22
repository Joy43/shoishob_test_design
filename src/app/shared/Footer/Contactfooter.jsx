import logo from "../../../../public/logo.svg";
import { FaInstagram, FaPhone, FaWhatsapp, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import Image from 'next/image'
const Contactfooter =()=>{

    return(
<div className="flex flex-wrap justify-between gap-6 p-4 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-2">
          <FaPhone className="text-[#2B2D42] w-8 h-8" />
          <p className="text-gray-700 text-lg">Do You Need Help</p>
          <a href="tel:+88 01701677162" className="text-blue-600 text-lg">+88 01701677162</a>
        </div>

        <div className="flex justify-center">
          <Image className="contrast-200" src={logo} width={150} height={150} alt="Shoishob Logo" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-black font-bold text-lg">Connect on Social</p>
          <ul className="flex gap-4">
            {[FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp].map((Icon, index) => (
              <li key={index}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Icon className="h-6 w-6 text-[#2B2D42] text-lg hover:text-indigo-400" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

    );
};
export default Contactfooter;