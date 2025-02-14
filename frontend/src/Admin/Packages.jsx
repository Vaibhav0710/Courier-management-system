import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import Header from "../components/Headers";
import "./Packages.css";
import NaavBaar from "../components/NaavBaar";
import Footeer from "../components/Footeer";
import { getAllOrders, acceptPayment } from "../Services/admin.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Packages = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch order data from API
  const loadOrder = async () => {
    setLoading(true);
    try {
      const response = await getAllOrders();
      console.log("API Response:", response);

      if (response && Array.isArray(response)) {
        setOrders(response);
      } else {
        console.error("Invalid response format:", response);
        toast.error("Failed to fetch packages. Unexpected response format.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error loading packages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle payment acceptance
  const handlePayment = async (orderId) => {
    if (window.confirm("I have received payment. Confirm?")) {
      try {
        await acceptPayment(orderId);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.orderId !== orderId)
        );
        toast.success("Payment received successfully!");
      } catch (error) {
        console.error("Error processing payment:", error);
        toast.error("Failed to process payment. Please try again.");
      }
    }
  };

  // Format date and time
  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Load orders on component mount
  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <div className="packages-container">
      <NaavBaar />
      <div className="content">
        <Container>
          <Header title="Packages" subtitle="List of parcels" />
          <div className="table-container mt-4">
            {loading ? (
              <p className="text-center">Loading packages...</p>
            ) : orders.length > 0 ? (
              <Table striped hover responsive>
                <thead className="table-dark">
                  <tr>
                    <th>Id</th>
                    <th>Delivery Address</th>
                    <th>Date</th>
                    <th>Vehicle</th>
                    <th>Agent Id</th>
                    <th>Customer Id</th>
                    <th>Price</th>
                    <th>Order Status</th>
                    <th>Accept Order</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.orderId}</td>
                      <td className="text-success">{order.deliveryAddress}</td>
                      <td>{formatDateTime(order.orderDate)}</td>
                      <td>{order.vehicleRequired}</td>
                      <td>{order.assignedAgent?.agentId || "N/A"}</td>
                      <td>{order.customer?.customerId || "N/A"}</td>
                      <td>{order.price !== null ? `$${order.price}` : "N/A"}</td>
                      <td
                        style={{
                          color:
                            order.orderStatus === "PENDING"
                              ? "red"
                              : order.orderStatus === "IN_PROGRESS"
                              ? "orange"
                              : order.orderStatus === "OUT_FOR_DELIVERY"
                              ? "lightgreen"
                              : order.orderStatus === "COMPLETED"
                              ? "green"
                              : "black",
                        }}
                      >
                        {order.orderStatus}
                      </td>
                      <td>
                        {order.orderStatus === "PENDING" && (
                          <button
                            type="button"
                            className="btn btn-success"
                            style={{ padding: "5px" }}
                            onClick={() => handlePayment(order.orderId)}
                          >
                            Receive Payment
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-center" style={{ color: "red" }}>
                No packages found.
              </p>
            )}
          </div>
        </Container>
      </div>
      <Footeer />
    </div>
  );
};

export default Packages;
