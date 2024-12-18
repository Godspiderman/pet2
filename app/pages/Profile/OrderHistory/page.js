'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

function OrderHistoryPage() {
    const router = useRouter();
    const [orders, setOrders] = useState(null);
    const [orderStatuses, setOrderStatuses] = useState([]);

    const userId = 2;
    const isUser=true;

    const handleViewDetails = () => {
        router.push("/pages/Profile/OrderDetails");
    };

    const handleTrackOrder = () => {
        router.push("/pages/Profile/OrderHistory/TrackOrder");
    };

    useEffect(() => {
        const fetchOrderStatuses = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/public/orderStatus/getAll');
                if (response.ok) {
                    const data = await response.json();
                    setOrderStatuses(data);
                } else {
                    console.error('Failed to fetch order statuses');
                }
            } catch (err) {
                console.error('Error fetching order statuses:', err);
            }
        };

        fetchOrderStatuses();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {

                const response = await fetch(`http://localhost:8080/api/orders/getAllUserandVendor/${userId}?isUser=${isUser}`);
                if (response.ok) {
                    const data = await response.json();
                    
                    const filteredOrders = data.filter(order => order.userId === 2 && isUser === true);
                    // const filteredOrders = data.filter(order => order.userId === 2);
                    
                    setOrders(filteredOrders);
                } else {
                    console.error('Failed to fetch orders: Server responded with an error');
                    setOrders([]);
                }
            } catch (err) {
                console.error('Failed to fetch orders:', err);
                setOrders([]);
            }
        };
    
        fetchOrders();
    }, []);
    
    
    

    // Function to get order status name by ID
    const getOrderStatusName = (statusId) => {
        const status = orderStatuses.find(status => status.id === statusId);
        return status ? status.name : 'Unknown';
    };

    if (!orders || orderStatuses.length === 0) {
        return <div>Loading orders and statuses...</div>;
    }

    return (
        <div className="orderhistory-page">
            <div className="orderhistory-container">
                <h2 className="orderhistory-head">Your Orders</h2>
                {orders.length > 0 ? (
                    <div className="orderhistory-list">
                        {orders.map((order) => (
                            <div className="orderhistory-card" key={order.id}>
                                <img
                                    src="/image/tap-1.png"
                                    alt="order history"
                                    className="orderhistory-image"
                                />
                                <div className="orderhistory-info">
                                    <p className='order-product'>Product Name: {order.productName}</p>
                                    <p className="order-description">Product Price: $ {order.productPrice}</p>
                                    <p className="order-delivery">Order Date: {order.orderDate}</p>
                                    <p className="order-delivery">Delivery Date: {order.deliveryDate}</p>
                                    <p className="order-delivery">Order status: {getOrderStatusName(order.orderStatusId)}</p>

                                    <div className="order-actions">
                                        <button
                                            className="btn btn-details"
                                            onClick={() => handleViewDetails(order.id)}
                                        >
                                            View Details
                                        </button>
                                        <button
                                            className="btn btn-track"
                                            onClick={() => handleTrackOrder(order.id)}
                                        >
                                            Track Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No orders found for this user.</div>
                )}
            </div>
        </div>
    );
}

export default OrderHistoryPage;
