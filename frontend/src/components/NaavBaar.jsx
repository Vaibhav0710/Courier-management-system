import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import PLogo from '../assets/ProjectLogo.png';
import "./NaavBaar.css"; // Ensure this file is imported

function NaavBaar() {
  const [role, setRole] = useState(localStorage.getItem("userType") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    // Function to update role and login status
    const updateNavState = () => {
      setRole(localStorage.getItem("userType") || "");
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    // Listen for changes in localStorage
    window.addEventListener("storage", updateNavState);

    return () => {
      window.removeEventListener("storage", updateNavState);
    };
  }, []);

  const homeLink =
    role === "admin" ? "/admin-dashboard" :
    role === "user" ? "/user-home" :
    role === "delivery_partner" ? "/delivery-agent-home" : "/";

  return (
    <>
      <div style={{ height: "70px" }}></div>
      <header>
        <Navbar expand="lg" className="fixed-top navBack shadow-lg">
          <Container fluid>
            <Navbar.Brand as={Link} to={homeLink} className="text-black">
              <img 
                alt="Logo" 
                src={PLogo} 
                width="30" 
                height="30" 
                className="d-inline-block align-top navbar-logo" 
              />
              {" "} Courier Express
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
              <Nav className="ms-auto">
                {isLoggedIn && role === "admin" && (
                  <>
                    <Nav.Link as={Link} to="/admin-agents">Agents</Nav.Link>
                    <Nav.Link as={Link} to="/admin-customers">Customers</Nav.Link>
                    <Nav.Link as={Link} to="/admin-packages">Packages</Nav.Link>
                  </>
                )}

                {isLoggedIn && role === "delivery_partner" && (
                  <>
                    <Nav.Link as={Link} to="/delivery-profile">Profile</Nav.Link>
                    <Nav.Link as={Link} to="/delivery-available-orders">Available Orders</Nav.Link>
                    <Nav.Link as={Link} to="/delivery-current-orders">Current Orders</Nav.Link>
                    <Nav.Link as={Link} to="/delivery-completed-orders">Completed Orders</Nav.Link>
                  </>
                )}

                {isLoggedIn && role === "user" && (
                  <>
                    <Nav.Link as={Link} to="/user-orders">Orders</Nav.Link>
                    <Nav.Link as={Link} to="/user-bookfor">Book For</Nav.Link>
                    <Nav.Link as={Link} to="/user-profile">Profile</Nav.Link>
                  </>
                )}

                <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>

                {isLoggedIn ? (
                  <Nav.Link as={Link} to="/logout" onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userType");
                    setRole(""); 
                    setIsLoggedIn(false);
                  }}>
                    <button className="small-btn">Logout</button>
                  </Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/login">
                    <button className="small-btn">Login</button>
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default NaavBaar;
