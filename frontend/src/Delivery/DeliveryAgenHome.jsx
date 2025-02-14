import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NaavBaar from "../components/NaavBaar";
import Footeer from "../components/Footeer"; // Ensure correct import
import "./DeliveryAgentHome.css"; // Import CSS

const DeliveryAgentHome = ({ agentName = "XXX" }) => {
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate();
  const earnings = localStorage.getItem("earnings");
  console.log(earnings);
  useEffect(() => {
    document.body.classList.add("delivery-page");
    return () => {
      document.body.classList.remove("delivery-page");
    };
  }, []);

  const handleSectionClick = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="outer-div">
      <div className="delivery-page">
        <NaavBaar />

        <div className="main-content">
          <div className="container">
            <h1 className="welcome-text">Welcome Agent</h1>

            <div className="section-container">
              {/* Orders Section */}
              <div
                className={`section ${openSection === "orders" ? "open" : ""}`}
                onClick={() => handleSectionClick("orders")}
              >
                <h2 className="section-title">Orders</h2>
                <div
                  className={`section-content ${openSection === "orders" ? "show" : ""
                    }`}
                >
                  <div
                    className="order-item"
                    onClick={() => navigate("/delivery-current-orders")}
                  >
                    Current Orders
                  </div>
                  <div
                    className="order-item"
                    onClick={() => navigate("/delivery-available-orders")}
                  >
                    Available Orders
                  </div>
                  <div
                    className="order-item"
                    onClick={() => navigate("/delivery-completed-orders")}
                  >
                    Completed Orders
                  </div>
                </div>
              </div>

              {/* Earnings Section */}
              <div
                className={`section ${openSection === "earnings" ? "open" : ""
                  }`}
                onClick={() => handleSectionClick("earnings")}
              >
                <h2 className="section-title">Earnings</h2>
                <div
                  className={`section-content ${openSection === "earnings" ? "show" : ""
                    }`}
                >
                  <div className="earning-item">
                    Total Earnings: <span>₹{earnings}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Always at the bottom */}
      </div>
      <Footeer />
    </div>
  );
};

export default DeliveryAgentHome;
