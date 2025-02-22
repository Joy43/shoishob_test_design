import { Inter } from "next/font/google";
// import Footer from "./shared/Footer";

import Testimonials from "./pages/testimonia/testimonia";
// import LatestProduct from "./pages/Latestproduct/Latestproduct";
// import Featurescategories from "./pages/Featurecategories/Featurescategories";
import Gallery from "./pages/Galley/Gallery";
// import Bandproduct from "./pages/Bandproduct/Bandproduct";
import Banner from "./pages/Banner/Banner";
import WhyUs from "./pages/Whyus/Whyus";
import Newoffer from "./pages/Newoffer/Newoffer";
import { Delivery } from "./pages/Whyus/Delivery";

import Bandtest from "./pages/Bandproduct/Bandtest";
// import LatestProduct from "./pages/Latestproduct/Latestproduct";
import { Latesttest } from "./pages/Latestproduct/Latesttest";
import Testcategories from "./pages/Featurecategories/Testcategories";
import Bandproduct from "./pages/Bandproduct/Bandproduct";

import FacebookChatbot from "./components/FacebookChatbot";
import Bands from "./(without)/bands/page";
import Footer from "./shared/Footer/Footer";
import Navbar from "./shared/Navbar/Navbar";
import Newproduct from "./pages/Featurecategories/Newproduct";
// import Toprated from "./pages/Toprated/Toprated";

// import FurnitureCard from "./pages/Newoffer/FurnituredCard";


// Import Inter font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
});

export default function Home() {
  return (
    <div className={`${inter.variable} antialiased`}>
      <Navbar />
      <Banner/>
      <Delivery/>
      {/* <Featurescategories /> */}
      <FacebookChatbot/>
      <Testcategories/>
      <Newproduct/>
      {/* <ProductGrid/> */}
      {/* <LatestProduct /> */}
      <Latesttest/>
      <Newoffer/>
      {/* <FurnitureCard/> */}
      <Bandtest/>
      {/* <Bandproduct /> */}
      <Bands/>
      <Gallery />
      {/* <Toprated/> */}
      <Testimonials />
      <WhyUs />
      <Footer />
    </div>
  );
}
