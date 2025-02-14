import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Orders.css";
import { getAllAvailableOrders, acceptOrder } from "../Services/delivery.service";
import NaavBaar from "../components/NaavBaar";
import Footeer from "../components/Footeer";

const AvailableOrders = ({ refreshCurrentOrders }) => {
  const [availableOrders, setAvailableOrders] = useState([]);
  const agentId = localStorage.getItem("deliveryAgentID");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const orders = await getAllAvailableOrders();
      if (orders && orders.length > 0) {
        setAvailableOrders(orders);
      } else {
        setAvailableOrders([]);
        toast.warn("No available orders at the moment.");
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Failed to load orders. Please try again later.");
    }
  };

  const handleAcceptOrder = async (orderId) => {
    if (!agentId) {
      toast.error("Agent ID is required. Please log in again.");
      return;
    }

    const acceptedBy = { agentId };
    toast.info(`Processing order ${orderId}...`);

    try {
      await acceptOrder(orderId, acceptedBy);
      setAvailableOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== orderId)
      );
      toast.success(`Order ${orderId} accepted successfully!`);
      if (refreshCurrentOrders) refreshCurrentOrders();
    } catch (error) {
      console.error("Failed to accept order:", error);
      toast.error("Failed to accept the order. Please try again.");
    }
  };

  return (
    <div>
      <NaavBaar />
      <div className="orders delivery-page">
        <h2 className="orders-title">Available Orders</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Status</th>
              <th>Price</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {availableOrders.length > 0 ? (
              availableOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.customer?.name || "Unknown"}</td>
                  <td>{order.deliveryAddress}</td>
                  <td>{order.orderStatus}</td>
                  <td>₹{order.price}</td>
                  <td>
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <button
                      className="accept-btn"
                      onClick={() => handleAcceptOrder(order.orderId)}
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No available orders</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footeer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AvailableOrders;
