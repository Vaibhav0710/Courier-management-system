import React from "react";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Import the CSS file for styling

function LandingPage() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <Container className="landing-container">
      {/* Title and Subtitle at the Top */}
      <div className="text-center">
        <h1 className="landing-title">Welcome to Courier Express</h1>
        <p className="landing-subtitle">Choose your role and get started!</p>
      </div>

      {/* Cards Section */}
      <div className="card-container">
        {/* Customer Card */}
        <Card className="landing-card" onClick={() => navigate("/user")}>
          <Card.Body>
            <Card.Title className="card-title">User</Card.Title>
          </Card.Body>
        </Card>

        {/* Delivery Partner Card */}
        <Card className="landing-card" onClick={() => navigate("/delivery")}>
          <Card.Body>
            <Card.Title className="card-title">Delivery Partner</Card.Title>
          </Card.Body>
        </Card>

        {/* Admin Card */}
        <Card className="landing-card" onClick={() => navigate("/admin")}>
          <Card.Body>
            <Card.Title className="card-title">Admin</Card.Title>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default LandingPage;
