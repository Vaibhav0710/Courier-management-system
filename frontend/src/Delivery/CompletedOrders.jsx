import React, { useState, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "./Orders.css";
import { getMyDeliveredOrders } from "../Services/delivery.service";
import NaavBaar from "../components/NaavBaar";
import Footeer from "../components/Footeer";

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const toastDisplayed = useRef(false); // Prevent double toasts

  useEffect(() => {
    const loadDeliveredOrders = async () => {
      setLoading(true);
      try {
        const response = await getMyDeliveredOrders();
        if (response && response.length > 0) {
          setCompletedOrders(response);
          if (!toastDisplayed.current) {
            toast.success("Completed orders loaded successfully!");
            toastDisplayed.current = true;
          }
        } else {
          if (!toastDisplayed.current) {
            toast.warn("No completed orders found.");
            toastDisplayed.current = true;
          }
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadDeliveredOrders();
  }, []);

  return (
    <div>
      <NaavBaar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="orders delivery-page">
        <h2 className="orders-title" style={{ textAlign: "center" }}>
          Completed Orders
        </h2>
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
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "10px" }}>
                  Loading...
                </td>
              </tr>
            ) : completedOrders.length > 0 ? (
              completedOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.customer?.name || "Unknown"}</td>
                  <td>{order.deliveryAddress}</td>
                  <td style={{ color: order.orderStatus === "DELIVERED" ? "green" : "black" }}>
                    {order.orderStatus}
                  </td>
                  <td>{order.price ? `$${order.price}` : "N/A"}</td>
                  <td>
                    {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => toast.info(`Viewing order ${order.orderId}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", color: "red" }}>
                  No completed orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footeer />
    </div>
  );
};

export default CompletedOrders;
