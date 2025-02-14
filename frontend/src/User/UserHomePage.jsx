import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./UserHomePage.css";
import NaavBaar from "../components/NaavBaar";
import Footeer from "../components/Footeer";

const UserHomePage = () => {
  return (
    <div>
      <NaavBaar />
      <Container className="user-page-container mt-5 text-center">
        <h1 className="user-page-header">Welcome to Our Courier Express</h1>
        <p className="user-page-description">Your reliable partner for fast and secure deliveries.</p>
        
        <Row className="user-page-row mt-4">
          {/* Profile Card */}
          <Col md={4} className="mb-4">
            <Card className="text-center user-page-cuscard">
              <Card.Body>
                <Card.Title className="user-page-card-title">My Profile</Card.Title>
                <Card.Text className="user-page-card-text">
                  Manage your account details and preferences.
                </Card.Text>
                <Link to="/user-profile">
                  <Button className="user-page-btn" variant="primary">Go to Profile</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Book Courier Card */}
          <Col md={4} className="mb-4">
            <Card className="text-center user-page-cuscard">
              <Card.Body>
                <Card.Title className="user-page-card-title">Book Courier</Card.Title>
                <Card.Text className="user-page-card-text">
                Schedule a new delivery with ease and confidence.
                </Card.Text>
                <Link to="/user-bookfor">
                  <Button className="user-page-btn" variant="primary">Book Now</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          {/* Orders Card */}
          <Col md={4} className="mb-4">
            <Card className="text-center user-page-cuscard">
              <Card.Body>
                <Card.Title className="user-page-card-title">My Orders</Card.Title>
                <Card.Text className="user-page-card-text">
                  Track and manage your courier bookings.
                </Card.Text>
                <Link to="/user-orders">
                  <Button className="user-page-btn" variant="primary">View Orders</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footeer />
    </div>
  );
};

export default UserHomePage;
