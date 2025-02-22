"use client";

import Container from "@/app/components/Container";
import { useShop } from "@/app/hooks/useShop";
import { ClientSegmentRoot } from "next/dist/client/components/client-segment";
// import { useWishlist } from "@/app/hooks/useWhishlist";
import Image from "next/image";


const Wishlist = () => {
  const { wishlist, removeFromWishlist, loading, error } = useShop();
 console.log(wishlist);

  if (loading) {
    return <p className="text-center py-10 text-lg text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-lg text-red-500">{error}</p>;
  }
// -----wishlist no here then show empty------------
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Your wishlist is empty.
        </p>
      </div>
    );
  }

  return (
    <Container className="py-6 p-4" >
      {/* ------clear all button------ */}

      <div className="flex justify-between max-auto p-2 ">
      <p className="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">
        Customer’s Wishlist
      </p>
      <p className="text-red-500 text-lg">Total Favorite {wishlist?.length}</p>
      </div>

{/* ----------------whish list------------- */}
      <div className="grid gap-2">

    
      {wishlist.map((item,index) => (
        <div
          key={index}
          className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full border-b border-gray-200  pb-4 md:pb-8 p-2"
        >
          {/* Product Image */}
          <div className="w-full md:w-40">
            <Image
              className="w-full object-cover rounded-lg"
              src={`https://fastdeals.ecommatrix.xyz/storage/app/public/product/thumbnail/${item?.product_full_info?.thumbnail
              }`}
              alt={item?.product_full_info.name}
              width={160}
              height={200}
              priority
            />
          </div>
<p >{item?.product_full_info.name}</p>
          {/*------------------ Product Info-------------- */}
          <div className="flex flex-col md:flex-row justify-between items-start w-full space-y-4 md:space-y-0">
            <div className="w-full flex flex-col justify-start items-start space-y-2">
              <h3 className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">
                {item?.productFullInfo?.unit_price
                } ৳
              </h3>
              <div className="flex flex-col space-y-1 text-gray-800 dark:text-gray-300">
                {item.style && (
                  <p className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Style: </span> {item.style}
                  </p>
                )}
                {item.size && (
                  <p className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Size: </span> {item.size}
                  </p>
                )}
                {item.color && (
                  <p className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Color: </span> {item.color}
                  </p>
                )}
              </div>
            </div>

            {/*------------- Price & Remove Button ------------------*/}
            <div className="flex items-center justify-between space-x-8 w-full md:w-auto">
              <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                ${item.price}
              </p>
              <button
                onClick={() => removeFromWishlist(item?.product_id)}
                className="text-red-500 text-sm font-semibold hover:underline dark:text-red-400"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
        </div>
    </Container>
  );
};

export default Wishlist;
