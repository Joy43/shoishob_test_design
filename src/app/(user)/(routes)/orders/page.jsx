"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import useOrder from "@/app/hooks/useOrder";
import Image from "next/image";
import Link from "next/link";

// Status colors mapping
const statusColors = {
  out_for_delivery: "bg-blue-500",
  processing: "bg-yellow-500",
  cancelled: "bg-red-500",
  completed: "bg-green-500",
};

const Orderlist = () => {
  const { orders, fetchOrders } = useOrder();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //---------- Memoized headers ------------
  const headers = useMemo(() => ["SL", "Order Details", "Status", "Amount", "Actions"], []);

  //-------- Fetch orders with error handling ---------
  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      await fetchOrders();
      setError(null);
    } catch (err) {
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [fetchOrders]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // --------- Format date display -----------
  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  // -------------- Memoized order rows -----------
  const renderOrderRows = useMemo(
    () =>
      orders?.map((order, index) => {
        const productImages = JSON.parse(order?.product?.images || "[]");
        const productImageUrl =
          productImages.length > 0
            ? `https://fastdeals.ecommatrix.xyz/storage/app/public/product/${productImages[0]}`
            : "https://fastdeals.ecommatrix.xyz/storage/app/public/shop/2024-11-06-672b45619903d.webp";

        return (
          <tr key={order.id} className="bg-white transition-colors duration-300 hover:bg-gray-50">
            <td className="p-5 text-sm font-medium text-gray-900">{index + 1}</td>
         {/*    /------oderder deatils----- */}
            <td className="p-5 text-sm font-medium text-gray-900">
              <div className="flex items-center gap-3">
                <Image
                  src={productImageUrl}
                  width={50}
                  height={50}
                  alt={`Order ${order.id} Thumbnail`}
                  className="rounded-md"
                  loading="lazy"
                />
                <div>
                  <p>Order #{order?.id}</p>
                  <p>{order?.details?.length} item(s)</p>
                  <p className="text-gray-600 text-sm">{formatDate(order?.created_at)}</p>
                </div>
              </div>
            </td>
            {/* ----status--- */}
            <td className="p-5 text-sm font-medium text-gray-900">
              <span className={`rounded-xl w-fit p-1 text-white text-center block ${statusColors[order.order_status] || "bg-[#2B2D42]"}`}>
                {order.order_status.replace("_", " ")}
              </span>
              <span className="text-gray-600 ml-2 text-sm block mt-1">
                {order.payment_status}</span>
            </td>
            {/* -----amount------- */}
            <td className="p-5 text-sm font-medium text-gray-900">৳ {Number(order?.order_amount).toFixed(2)}</td>
            {/* ---------action button---------- */}
            <td className="p-5">
              <div className="flex items-center gap-2">
                <Link  href={`/orders/vieworder?orderId=${order?.id}`} aria-label="View Order" className="p-2 rounded-full transition-colors duration-300 hover:bg-gray-200">
                  <IoEye className="text-lg" />
                </Link>
                {/* -------download----- */}
                <Link href="/"aria-label="Download Invoice" className="p-2 rounded-full transition-colors duration-300 hover:bg-gray-200">
                  <FaFileDownload className="text-lg" />
                </Link>
                {/* --------delate----- */}
                <Link href="/" aria-label="Delete Order" className="p-2 rounded-full transition-colors duration-300 hover:bg-red-200">
                  <MdDeleteForever className="text-lg text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        );
      }),
    [orders, formatDate]
  );

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">My Order List</h1>

      {error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : loading ? (
        <div className="text-center py-4">Loading orders...</div>
      ) : orders?.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">{renderOrderRows}</tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No orders found</p>
        </div>
      )}
    </div>
  );
};

export default Orderlist;
