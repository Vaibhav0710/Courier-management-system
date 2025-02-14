import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS
import "./Logout.css";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logging out...");

        // Clear session storage and local storage
        localStorage.removeItem("token");
        localStorage.removeItem("customerId");
        localStorage.removeItem("userType"); 
        localStorage.removeItem("adminId");
        localStorage.removeItem("deliveryAgentID");

        // Show success toast
        toast.success("Logged out successfully!", { position: "top-right" });

        // Redirect to login page after short delay
        setTimeout(() => navigate("/"), 1500);
    };

    return (
        <Container className="logout-container">
            <div className="logout-message">
                <h2>Are you sure you want to log out?</h2>
                <p>We will miss you!</p>
            </div>
            <div className="logout-buttons">
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </div>
        </Container>
    );
};

export default Logout;