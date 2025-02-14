import React, { useState, useEffect } from "react";
import NaavBaar from "../components/NaavBaar";
import Footeer from "../components/Footeer";
import {
  getDeliveryPartnerProfile,
  updateDeliveryPartnerProfile,
} from "../Services/delivery.service";
import { FaEdit, FaSave, FaMotorcycle, FaTruck } from "react-icons/fa";
import "./Profile.css"

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [deliveryPartnerId, setDeliveryPartnerId] = useState(null);
  const [name, setName] = useState("");
  const [phone, setMobile] = useState("");
  const [vehicleType, setVehicleType] = useState("Bike");
  const [vehicleNo, setVehicleNumber] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const storedPartnerId = localStorage.getItem("deliveryAgentID");
    if (!storedPartnerId) {
      console.error("No delivery partner ID found in localStorage.");
      return;
    }
    setDeliveryPartnerId(storedPartnerId);
    fetchProfileData(storedPartnerId);
  }, []);

  const fetchProfileData = async (partnerId) => {
    try {
      const response = await getDeliveryPartnerProfile(partnerId);
      console.log(partnerId);
      console.log(response);
      setName(response.name);
      setMobile(response.phone);
      
      setVehicleType(response.vehicleType);
      setVehicleNumber(response.vehicleNo);
      setIsAvailable(response.isAvailable);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleSaveProfile = async () => {
    const updatedData = {
      name,
      phone,
      vehicleType,
      vehicleNo,
      isAvailable,
    };

    try {
      console.log(updatedData)
      await updateDeliveryPartnerProfile(deliveryPartnerId, updatedData);
      console.log("Profile updated successfully!");
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-page">
      <NaavBaar />
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">Delivery Partner Profile</h2>
          {!isEditMode ? (
            <div className="profile-details">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Mobile:</strong> {phone}</p>
              <p><strong>Vehicle Type:</strong> {vehicleType === "Bike" ? <FaMotorcycle /> : <FaTruck />}</p>
              <p><strong>Vehicle Number:</strong> {vehicleNo}</p>
              
              <button className="profile-button edit-btn" onClick={() => setIsEditMode(true)}>
                <FaEdit /> Edit Profile
              </button>
            </div>
          ) : (
            <div className="profile-form">
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              <label>Mobile</label>
              <input type="text" value={phone} onChange={(e) => setMobile(e.target.value)} />
              <label>Vehicle Type</label>
              <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                <option value="Bike">Bike</option>
                <option value="Truck">Truck</option>
              </select>
              <label>Vehicle Number</label>
              <input type="text" value={vehicleNo} onChange={(e) => setVehicleNumber(e.target.value)} />
              <button className="profile-button save-btn" onClick={handleSaveProfile}>
                <FaSave /> Save Profile
              </button>
            </div>
          )}
        </div>
      </div>
      <Footeer />
    </div>
  );
};

export default Profile;