import NaavBaar from "../components/NaavBaar";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../Services/user.service"; // Import API function
import { useState } from "react";
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

    if (!name || !email || !phone || !password) {
      setError("Please fill all fields");
      toast.error("Please fill all fields!", { position: "top-right" });
      return;
    }

    const newCustomer = {
      name,
      email,
      phone,
      password,
    };

    try {
      const response = await createCustomer(newCustomer);
      console.log("Customer created successfully:", response);
      
      // Show success toast
      toast.success("Successfully registered!", { position: "top-right" });

      // Clear form fields
      e.target.reset();

      // Redirect after short delay
      setTimeout(() => navigate("/user"), 1500);
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
          <h2>Registration Form</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleRegisterSubmit}>
            <label htmlFor="fullname">Full Name</label>
            <input type="text" id="fullname" name="fullname" placeholder="Enter your full name" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />

            <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" name="phone" placeholder="Enter your phone number" required />

            <label htmlFor="new-password">New Password</label>
            <input type="password" id="new-password" name="new-password" placeholder="Enter your new password" required />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
