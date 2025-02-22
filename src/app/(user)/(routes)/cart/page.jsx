'use client'
import { useShop } from '@/app/hooks/useShop';
import Image from 'next/image';

const Cart = () => {
  const { cart,removeFromCart } = useShop();
  console.log(cart);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price - item.discount) * item.quantity, 0);
  return (
    <div className="container mx-auto px-2 sm:px-2 mt-8">
      <div className="flex flex-col lg:flex-row shadow-md my-10">
        {/* Left Side - Cart Items */}
        <div className="w-full lg:w-3/4 bg-white px-4 sm:px-6 py-10">
          <div className="flex flex-wrap justify-between border-b pb-4">
            <h1 className=" font-semibold text-xl sm:text-2xl">Shopping Cart: {cart?.length}</h1>
           
          </div>

          {cart.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-center md:items-stretch py-6 md:py-8 border-t border-gray-200">
              <div className="w-full md:w-1/4">
                <Image 
                  src={`https://fastdeals.ecommatrix.xyz/storage/app/public/product/thumbnail/${item?.thumbnail}`}
                  alt={item?.name} 
                  width={150} 
                  height={150} 
                  className="object-cover w-full h-auto md:h-32"
                />
              </div>

              <div className="md:w-3/4 w-full md:pl-4 flex flex-col justify-center">
                <p className="text-xs text-gray-600">{item?.product_type}</p>
                <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
                  <p className="text-base font-semibold text-gray-800">{item?.name}</p>
                  {/* -----select product----- */}
                  <select className="mt-2 sm:mt-0 py-1 px-2 border border-gray-300 
                  focus:outline-none"
                  value={item.quantity}
                  onChange={(e)=>updateCartQuantity(item.id, Number(e.target.value))}
                  >
                   {[...Array(10)].map((_,i)=>(
                    <option key={i+1} value={i+1}>
                      {i+1}
                    </option>
                   ))}
                  </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">Slug: {item?.slug}</p>
                <p className="text-xs text-gray-500 mt-1">Color: Black</p>
                <p className="text-xs text-gray-500 mt-1">Discount: {item?.discount}%</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-4">
                   {/* -----remove cart is not working---------- */}
                    <button onClick={()=>removeFromCart(item?.id)} className="text-xs text-red-500 underline cursor-pointer">Remove

                    </button>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">৳1,000</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Summary  cart*/}
        <div className="w-full lg:w-1/4 bg-gray-100 px-6 py-8">
          <h1 className="font-semibold text-xl border-b pb-4">Order Summary</h1>
          <div className="flex justify-between mt-6 mb-4">
            <span className="font-medium text-sm">Items {cart?.length}</span>
            <span className="font-medium text-sm">৳{totalPrice}</span>
          </div>
          <div>
            <label className="font-medium text-sm mb-2 block">Shipping</label>
            <select className="block p-2 border border-gray-300 w-full text-sm">
              <option>Standard shipping - ৳10.00</option>
            </select>
          </div>
          <div className="py-6">
            <label htmlFor="promo" className="font-medium text-sm mb-2 block">Promo Code</label>
            <input type="text" id="promo" placeholder="Enter your code" className="p-2 border border-gray-300 w-full text-sm" />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-4 py-2 text-sm text-white uppercase w-full">Apply</button>
          <div className="border-t mt-6">
            <div className="flex justify-between font-medium py-4 text-sm">
            <span>Total cost</span>
            <span>৳{totalPrice + 10}</span>
            </div>
            <button className="bg-indigo-500 hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
