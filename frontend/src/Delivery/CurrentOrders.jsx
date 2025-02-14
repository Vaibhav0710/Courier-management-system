import React, { useState, useEffect } from "react";
import "./Orders.css";
import { getMyOrders, deliverTheOrder } from "../Services/delivery.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NaavBaar from './../components/NaavBaar';
import Footeer from './../components/Footeer';

const CurrentOrders = () => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const orders = await getMyOrders();
        if (orders) {
          setCurrentOrders(orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const completeOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to mark this order as delivered?")) {
      try {
        await deliverTheOrder(orderId);
        toast.success("Order marked as delivered successfully!");
        setCurrentOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
      } catch (error) {
        console.error("Error delivering order:", error);
        toast.error("Failed to mark the order as delivered. Please try again.");
      }
    }
  };

  const relevantOrders = currentOrders.filter((order) =>
    ["IN_PROGRESS", "OUT_FOR_DELIVERY"].includes(order.orderStatus)
  );

  return (
    <div>
      <NaavBaar />
      <div className="orders delivery-page">
        <h2 className="orders-title">Current Orders</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>Loading orders...</td>
              </tr>
            ) : relevantOrders.length > 0 ? (
              relevantOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.customer?.name || "N/A"}</td>
                  <td>{order.deliveryAddress}</td>
                  <td
                    style={{
                      color:
                        order.orderStatus === "IN_PROGRESS"
                          ? "orange"
                          : order.orderStatus === "OUT_FOR_DELIVERY"
                            ? "green"
                            : "black",
                    }}
                  >
                    {order.orderStatus}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="complete-btn"
                        onClick={() => completeOrder(order.orderId)}
                      >
                        Complete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
                  No relevant orders found.
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

export default CurrentOrders;
