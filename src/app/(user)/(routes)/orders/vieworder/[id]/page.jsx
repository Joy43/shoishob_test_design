"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useOrder from "@/app/hooks/useOrder";
import Image from "next/image";
const ViewOrder = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { fetchOrderById, orderDetails } = useOrder();
  const [loading, setLoading] = useState(true);
  console.log("Order ID:", orderId);
console.log("Order Details:", orderDetails);
  useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId).finally(() => setLoading(false));
    }
  }, [orderId, fetchOrderById]);

  if (loading) return <p className="text-center py-4">Loading order details...</p>;
  if (!orderDetails) return <p className="text-center py-4">Order not found.</p>;

  return (
    <div className="p-6">
      {orderDetails.details && orderDetails.details.length > 0 ? (
  orderDetails.details.map((item) => (
    <div key={item.id} className="flex gap-4 border-b pb-2 my-2">
      <Image
        src={item.product?.image
          ? `https://fastdeals.ecommatrix.xyz/storage/app/public/product/${item.product.image}`
          : "/fallback-image.jpg"
        }
        width={50}
        height={50}
        alt={item.product?.name || "Product Image"}
        className="rounded-md"
      />
      <div>
        <p className="font-medium">{item.product?.name || "Unknown Product"}</p>
        <p className="text-gray-600">Qty: {item.quantity}</p>
        <p className="text-gray-900">৳ {Number(item.product?.price || 0).toFixed(2)}</p>
      </div>
    </div>
  ))
) : (
  <p className="text-gray-600">No products found for this order.</p>
)}

    </div>
  );
};

export default ViewOrder;
