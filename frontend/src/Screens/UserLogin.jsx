import React from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../components/NaavBaarContext";
import { loginCustomer } from "../Services/user.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS

function UserLogin() {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error("Please fill in both fields.", { position: "top-right" });
      return;
    }

    try {
      const response = await loginCustomer({ email, password });

      if (response) {
        localStorage.setItem("token", response.token); // Save JWT token
        localStorage.setItem("customerId", response.customerId); // Save customer ID
        setRole("user"); // Update role in context

        toast.success("Login successful!", { position: "top-right" }); // Success Toast
        navigate("/user-home"); // Redirect to user home page
      }
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.", {
        position: "top-right",
      }); // Error Toast
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>User Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <div>
          Don't have an account? <a href="/register">Register here</a>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
