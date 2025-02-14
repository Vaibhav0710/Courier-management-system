import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TruckPage.css"; 
import NaavBaar from "../components/NaavBaar";
import { createTruckOrder } from "../Services/user.service";

const TruckPage = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [distance, setDistance] = useState(null);
  const [fare, setFare] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "f6ed2732-5d48-4fa9-84e9-4069febdb6d8"; 

  const calculateFare = (distance) => (distance * 75).toFixed(0);

  const fetchCoordinates = async (address) => {
    const url = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(
      address
    )}&limit=1&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.hits?.length > 0 ? [data.hits[0].point.lng, data.hits[0].point.lat] : null;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      toast.error("Failed to fetch location.");
      return null;
    }
  };

  const fetchDistance = async () => {
    if (!pickupAddress || !deliveryAddress) {
      toast.warn("Enter both pickup and delivery addresses.");
      return;
    }

    setLoading(true);
    const pickupCoords = await fetchCoordinates(pickupAddress);
    const deliveryCoords = await fetchCoordinates(deliveryAddress);

    if (pickupCoords && deliveryCoords) {
      const url = `https://graphhopper.com/api/1/route?point=${pickupCoords[1]},${pickupCoords[0]}&point=${deliveryCoords[1]},${deliveryCoords[0]}&vehicle=truck&key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const distanceInKm = (data.paths?.[0]?.distance / 1000)?.toFixed(2);
        
        if (distanceInKm) {
          setDistance(distanceInKm);
          setFare(calculateFare(distanceInKm));
          toast.success(`Distance calculated: ${distanceInKm} km`);
        } else {
          toast.error("Failed to calculate distance.");
        }
      } catch (error) {
        console.error("Error fetching distance:", error);
        toast.error("Error fetching distance.");
      }
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !contact || !pickupAddress || !deliveryAddress || !distance || !fare) {
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }

    const bookingData = {
      customer: { customerId: localStorage.getItem("customerId") },
      deliveryAddress,
      orderStatus: "PENDING",
      vehicleRequired: "TRUCK",
      price: fare,
      orderDate: new Date().toISOString(),
    };

    try {
      await createTruckOrder(bookingData);
      toast.success("Truck booking successful!");
    } catch (err) {
      toast.error("Failed to process request.");
    }
    setLoading(false);
  };

  return (
    <Container className="truck-page-container mt-5">
      <NaavBaar />
      <h1 className="text-center truck-page-heading">Truck Services</h1>

      <section className="booking-section">
        <h2 className="booking-heading">Book a Truck Service</h2>
        <Form onSubmit={handleSubmit} className="booking-form">
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formContact">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter your contact number" value={contact} onChange={(e) => setContact(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formPickupAddress">
            <Form.Label>Pickup Address</Form.Label>
            <Form.Control type="text" placeholder="Enter pickup address" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formDeliveryAddress">
            <Form.Label>Delivery Address</Form.Label>
            <Form.Control type="text" placeholder="Enter delivery address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} required />
          </Form.Group>

          <Button variant="primary" type="button" onClick={fetchDistance} className="mt-3" disabled={loading}>
            {loading ? "Calculating..." : "Calculate Distance & Fare"}
          </Button>

          {distance && (
            <div className="mt-3">
              <p>Estimated Distance: {distance} km</p>
              <p>Estimated Fare: ₹{fare}</p>
            </div>
          )}

          <Button variant="success" type="submit" className="mt-3" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </section>
    </Container>
  );
};

export default TruckPage;
