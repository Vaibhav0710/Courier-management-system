import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./UOrders.css";
import NaavBaar from "../components/NaavBaar";
import Footeer from "../components/Footeer";
import { getAllOrders } from "../Services/user.service";

const UOrders = () => {
    const [uorders, setUOrders] = useState([]);
    // const customerId = localStorage.getItem("customerId"); // Get customer ID from localStorage

    // Fetch customer orders from API
    const loadUOrder = async () => {
        const customerId = localStorage.getItem("customerId");
    
        if (!customerId) {
            console.error("Customer ID is missing. Redirecting to login.");
            return;
        }
    
        try {
            const response = await getAllOrders(customerId); // ✅ Pass customerId here
            console.log("Fetched Orders:", response); 
            setUOrders(response || []); // Ensure no crash if response is null
        } catch (error) {
            console.error("Failed to fetch orders:", error.response?.data || error.message);
        }
    };
    useEffect(()=>{
        loadUOrder();
    },[])

    return (
        <div className="orders-page-container">
            <NaavBaar />
            <div className="orders-content">
                <div className="orders-wrapper">
                    <h2 className="orders-title">Your Orders</h2>

                    <Tabs defaultActiveKey="current" id="orders-tabs" className="mb-3">
                        {/* Current Orders (Includes PENDING & IN_PROGRESS) */}
                        <Tab eventKey="current" title="Current Orders">
                            <div className="orders-list">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Order Id</th>
                                            <th>Delivery Address</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Delivery Agent Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {uorders.length > 0 ? (
                                            uorders
                                                .filter(order =>
                                                    order.orderStatus?.toUpperCase() === "IN_PROGRESS" ||
                                                    order.orderStatus?.toUpperCase() === "PENDING"
                                                )
                                                .map((order) => (
                                                    <tr key={order.orderId}>
                                                        <td>{order.orderId}</td>
                                                        <td>{order.deliveryAddress || "N/A"}</td>
                                                        <td>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}</td>
                                                        <td>{order.orderStatus}</td>
                                                        <td> {order.assignedAgent?.name.toUpperCase() || "Not Assigned"}</td>
                                                    </tr>
                                                ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">No current orders found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Tab>

                        {/* Previous Orders (COMPLETED orders) */}
                        <Tab eventKey="previous" title="Previous Orders">
                            <div className="orders-list">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Order Id</th>
                                            <th>Delivery Address</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Delivery Agent Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {uorders.length > 0 ? (
                                            uorders
                                                .filter(order => order.orderStatus?.toUpperCase() === "COMPLETED")
                                                .map((order) => (
                                                    <tr key={order.orderId}>
                                                        <td>{order.orderId}</td>
                                                        <td>{order.deliveryAddress || "N/A"}</td>
                                                        <td>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}</td>
                                                        <td>{order.orderStatus}</td>
                                                        <td>{order.assignedAgent?.name.toUpperCase() || "Not Assigned"}</td>
                                                    </tr>
                                                ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">No previous orders found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <Footeer />
        </div>
    );
};

export default UOrders;
