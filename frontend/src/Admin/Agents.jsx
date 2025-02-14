import React, { useState, useEffect } from "react";
import Header from "../components/Headers";
import "./Agents.css";
import NaavBaar from "../components/NaavBaar";
import Footeer from "../components/Footeer";
import { getAllAgents, deleteAgent } from "../Services/admin.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to format date and time
  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  // Fetch delivery agents from API
  const loadAgent = async () => {
    setLoading(true);
    try {
      const response = await getAllAgents();
      console.log("API Response:", response);

      if (response && Array.isArray(response.data)) {
        setAgents(response.data);
      } else {
        console.error("Unexpected API response format:", response);
        setAgents([]);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
      toast.error("Failed to load agents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete agent
  const handleDelete = async (agentId) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      try {
        await deleteAgent(agentId);
        setAgents(agents.filter((agent) => agent.agentId !== agentId));
        toast.success("Agent deleted successfully!");
      } catch (error) {
        console.error("Error deleting agent:", error);
        toast.error("Failed to delete the agent. Please try again.");
      }
    }
  };

  // Load agents when the component mounts
  useEffect(() => {
    loadAgent();
  }, []);

  return (
    <div>
      <NaavBaar />
      <div className="container">
        <Header title="Delivery Agents" subtitle="List of Agents" />
        <div className="table-container">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Vehicle No</th>
                <th>Vehicle Type</th>
                <th>Earnings</th>
                <th>Registration Date</th>
                <th>Last Online</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="11" style={{ textAlign: "center" }}>
                    Loading agents...
                  </td>
                </tr>
              ) : agents.length > 0 ? (
                agents.map((agent) => (
                  <tr key={agent.agentId}>
                    <td>{agent.agentId}</td>
                    <td className="text-primary">{agent.name}</td>
                    <td>{agent.email}</td>
                    <td>{agent.phone}</td>
                    <td>{agent.vehicleNo}</td>
                    <td>{agent.vehicleType}</td>
                    <td>${agent.earnings.toLocaleString()}</td>
                    <td>{formatDateTime(agent.registrationDate)}</td>
                    <td>{formatDateTime(agent.lastOnline)}</td>
                    <td>
                      <span
                        className={
                          agent.status === "ONLINE"
                            ? "text-online"
                            : "text-offline"
                        }
                      >
                        {agent.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(agent.agentId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" style={{ textAlign: "center", color: "red" }}>
                    No agents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footeer />
    </div>
  );
};

export default Agents;
