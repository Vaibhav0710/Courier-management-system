import NaavBaar from "../components/NaavBaar";
import "./DeliveryRegister.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createDeliveryAgent } from "../Services/delivery.service"; // Import API function
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.fullname.value.trim();
    const email = e.target.email.value.trim();
    const phone = e.target.phone.value.trim();
    const password = e.target["new-password"].value;
    const vehicleNo = e.target["vehicle-number"].value.trim();
    const vehicleType = e.target["vehicle-type"].value;

    if (!name || !email || !phone || !password || !vehicleNo || !vehicleType) {
      setError("Please fill all fields");
      toast.error("Please fill all fields!", { position: "top-right" });
      return;
    }

    const newDeliveryAgent = {
      name,
      email,
      phone,
      password,
      vehicleNo,
      vehicleType,
    };

    try {
      const response = await createDeliveryAgent(newDeliveryAgent);
      console.log("Delivery Agent registered successfully:", response);

      // Show success toast
      toast.success("Successfully registered!", { position: "top-right" });

      // Clear form fields
      e.target.reset();

      // Redirect after short delay
      setTimeout(() => navigate("/delivery"), 1500);
    } catch (err) {
      console.error("Registration failed:", err);
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right" });
    }
  };

  return (
    <div>
      <NaavBaar />
      <div className="container">
        <div className="card">
          <h2>Delivery Registration</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleRegisterSubmit}>
            {/* Full Name */}
            <label htmlFor="fullname">Full Name</label>
            <input type="text" id="fullname" name="fullname" placeholder="Enter your full name" required />

            {/* Email */}
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />

            {/* Phone */}
            <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" name="phone" placeholder="Enter your phone number" required />

            {/* Password */}
            <label htmlFor="new-password">New Password</label>
            <input type="password" id="new-password" name="new-password" placeholder="Enter your password" required />

            {/* Vehicle Number */}
            <label htmlFor="vehicle-number">Vehicle Number</label>
            <input type="text" id="vehicle-number" name="vehicle-number" placeholder="Enter your vehicle number" required />

            {/* Vehicle Type Dropdown */}
            <label htmlFor="vehicle-type">Vehicle Type</label>
            <select id="vehicle-type" name="vehicle-type" required>
              <option value="">Select Vehicle Type</option>
              <option value="BIKE">Bike</option>
              <option value="TRUCK">Truck</option>
            </select>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
