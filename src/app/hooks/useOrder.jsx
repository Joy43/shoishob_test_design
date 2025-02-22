'use client'

import { useEffect, useCallback, useState } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "https://fastdeals.ecommatrix.xyz/api/v1/customer/order";

const useOrder = () => {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Memoized headers with cache control
    const getHeaders = useCallback(() => ({
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Cache-Control": "no-store, max-age=0"
        },
        // Axios-specific cache configuration
        cache: 'no-store'
    }), [token]);

    // Unified error handler
    const handleApiError = useCallback((err, defaultMessage) => {
        const errorMessage = err.response?.data?.message || defaultMessage;
        console.error(errorMessage, err);
        setError(errorMessage);
        toast.error(errorMessage);
        return errorMessage;
    }, []);

    // Base fetch function with cache control
    const fetchData = useCallback(async (url, config = {}) => {
        if (!token) return null;
        setLoading(true);
        try {
            const response = await axios({
                ...config,
                url: `${API_BASE_URL}${url}`,
                ...getHeaders()
            });
            return response.data;
        } catch (err) {
            return Promise.reject(handleApiError(err, "Request failed"));
        } finally {
            setLoading(false);
        }
    }, [token, getHeaders, handleApiError]);

    // Fetch all orders with cache busting
    const fetchOrders = useCallback(async () => {
        try {
            const data = await fetchData('/list', {
                method: 'GET',
                params: { _: Date.now() } 
            });
            setOrders(data.orders || []);
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }, [fetchData]);

    // Fetch order details by ID
    const fetchOrderById = useCallback(async (orderId) => {
        try {
            const data = await fetchData(`/get-order-by-id?order_id=${orderId}`);
            setOrderDetails(data);
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }, [fetchData]);

    // Place a new order
    const placeOrder = useCallback(async (orderData) => {
        try {
            const data = await fetchData('/place', {
                method: 'POST',
                data: orderData
            });
            toast.success("Order placed successfully!");
            // Refresh order list
            await fetchOrders(); 
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }, [fetchData, fetchOrders]);

    // Reorder previous order
    const reorder = useCallback(async (orderId) => {
        try {
            const data = await fetchData('/again', {
                method: 'POST',
                data: { order_id: orderId }
            });
            toast.success("Order placed again successfully!");
            await fetchOrders(); // Refresh order list
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }, [fetchData, fetchOrders]);

    // Initial data fetch with cleanup
    useEffect(() => {
        const abortController = new AbortController();
        
        if (token) {
            getHeaders().headers.signal = abortController.signal;
            fetchOrders();
        }

        return () => abortController.abort();
    }, [token, fetchOrders, getHeaders]);

    return {
        orders,
        orderDetails,
        loading,
        error,
        fetchOrders,
        fetchOrderById,
        placeOrder,
        reorder,
    };
};

export default useOrder;