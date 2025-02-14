import React, { useState, useEffect } from "react";
import NaavBaar from "../components/NaavBaar";
import Footeer from "../components/Footeer";
import {
  getCustomerProfile,
  updateCustomerProfile,
} from "../Services/user.service";

const UProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registrationDate, setRegistrationDate] = useState("");

  // ✅ Load user profile on component mount
  useEffect(() => {
    const storedCustomerId = localStorage.getItem("customerId");
    if (!storedCustomerId) {
      console.error("No customer ID found in localStorage.");
      return;
    }
    setCustomerId(storedCustomerId);
    console.log(storedCustomerId);
    fetchUserProfile(storedCustomerId);
  }, []);

  // ✅ Fetch user profile data

  const fetchUserProfile = async (customerId) => {
    try {
      const response = await getCustomerProfile(customerId);
      setUserName(response.name);
      setEmail(response.email);
      setPhone(response.phone);
      setRegistrationDate(
        response.registration_date || new Date().toISOString()
      );
      setPassword(response.password);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // ✅ Handle profile update
  const handleSaveProfile = async () => {
    const updatedCustomerData = {
      name: userName,
      email,
      phone,
      // password, // Backend should handle hashing if needed
    };

    try {
      await updateCustomerProfile(customerId, updatedCustomerData);
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
          <h2 className="profile-title">User Profile</h2>
          {!isEditMode ? (
            <div className="profile-details">
              <p>
                <strong>Full Name:</strong> {userName}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Phone:</strong> {phone}
              </p>
              <p>
                <strong>Registration Date:</strong>{" "}
                {new Date(registrationDate).toLocaleDateString()}
              </p>
              <button
                className="profile-button edit-btn"
                onClick={() => setIsEditMode(true)}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="profile-form">
              <div className="profile-section">
                <label htmlFor="userName" className="profile-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="userName"
                  className="profile-input"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="profile-section">
                <label htmlFor="email" className="profile-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="profile-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </div>
              <div className="profile-section">
                <label htmlFor="phone" className="profile-label">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  className="profile-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="profile-section">
                <label htmlFor="password" className="profile-label">
                  Password
                </label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="profile-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    style={{ color: "black" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
              <button
                className="profile-button save-btn"
                onClick={handleSaveProfile}
              >
                Save Profile
              </button>
            </div>
          )}
        </div>
      </div>
      <Footeer />
    </div>
  );
};

export default UProfile;
