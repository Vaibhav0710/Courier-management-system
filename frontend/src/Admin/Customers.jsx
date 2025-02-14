import React, { useEffect, useState, useCallback } from "react";
import { getAllCustomers } from "../Services/admin.service";
import Header from "../components/Headers";
import NaavBaar from "../components/NaavBaar";
import Footeer from "../components/Footeer";
import { useNavigate } from "react-router-dom";
import "./Customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString(); // Converts to a readable date and time
  };

  const loadCustomer = useCallback(async () => {
    try {
      setError("");
      const customers = await getAllCustomers();
      setCustomers(customers);
    } catch (err) {
      setError(err.message);
      if (err.message.includes("No token")) {
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Redirect after 3 seconds
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadCustomer();
  }, [loadCustomer]);

  return (
    <div>
      <NaavBaar />
      <div className="container mt-4">
        <Header title="Customers" subtitle="Managing the Customer list" />
        <div className="mt-4">
          {loading ? (
            <p className="text-center">Loading customers...</p>
          ) : error ? (
            <p className="text-center text-danger">
              {error}
              {error.includes("No token") && (
                <span> Redirecting to login...</span>
              )}
            </p>
          ) : customers.length > 0 ? (
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Registration Date</th>
                  <th>Last Online</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.customerId}>
                    <td>{customer.customerId}</td>
                    <td className="text-success">{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                    <td>{customer.status}</td>
                    <td>{formatDateTime(customer.registrationDate)}</td>
                    <td>{formatDateTime(customer.lastOnline)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No customers found.</p>
          )}
        </div>
      </div>
      <Footeer />
    </div>
  );
};

export default Customers;
