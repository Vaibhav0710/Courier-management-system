import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBox, FaUser } from "react-icons/fa";
import "./Dashboard.css";
import NaavBaar from "../components/NaavBaar";
import Footeer from "../components/Footeer";

const Dashboard = () => {
  return (
    <div>
      <NaavBaar />
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </header>

        {/* Dashboard Cards Section */}
        <section className="dashboard-cards">
          {/* Delivery Agents Card */}
          <Link to="/admin-agents" className="dashboard-card">
            <FaUsers className="dashboard-icon" />
            <h2>Delivery Agents</h2>
            <p>Manage delivery agents efficiently.</p>
          </Link>

          {/* Packages Card */}
          <Link to="/admin-packages" className="dashboard-card">
            <FaBox className="dashboard-icon" />
            <h2>Packages</h2>
            <p>Track and manage packages.</p>
          </Link>

          {/* Customers Card */}
          <Link to="/admin-customers" className="dashboard-card">
            <FaUser className="dashboard-icon" />
            <h2>Customers</h2>
            <p>View and manage customers.</p>
          </Link>
        </section>
      </div>
      <Footeer />
    </div>
  );
};

export default Dashboard;