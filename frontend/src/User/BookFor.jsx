import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './BookFor.css';  // Ensure the correct path to your CSS file
import NaavBaar from "../components/NaavBaar";
import Footeer from '../components/Footeer';

const Bookfor = () => {
    return (
        <>
        <NaavBaar/>
        <Container className="user-page-container mt-5">
            <h1 className="text-center user-page-header">Book a Service</h1>
            <Row className="user-page-row mt-4">
                {/* 2-Wheeler Card */}
                <Col md={4} className="mb-4">
                    <Card className="text-center user-page-cuscard">
                        <Card.Body>
                            <Card.Title className="user-page-card-title">2-Wheeler</Card.Title>
                            <Card.Text className="user-page-card-text">
                                Book a 2-wheeler for quick and efficient transportation.
                            </Card.Text>
                            <Link to="/user-two-wheeler">
                                <Button className="user-page-btn" variant="primary">Select</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Truck Card */}
                <Col md={4} className="mb-4">
                    <Card className="text-center user-page-cuscard">
                        <Card.Body>
                            <Card.Title className="user-page-card-title">Truck</Card.Title>
                            <Card.Text className="user-page-card-text">
                                Hire a truck for larger loads and long-distance transport.
                            </Card.Text>
                            <Link to="/user-truck">
                                <Button className="user-page-btn" variant="primary">Select</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Footeer />
        </>
    );
};

export default Bookfor;
