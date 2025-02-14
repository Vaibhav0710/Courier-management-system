import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../components/NaavBaarContext";
import { adminLogin } from "../Services/DeliveryAdminauth.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS

function AdminLogin() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setRole } = useRole();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const response = await adminLogin({ email, password });

    if (response) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("userType", "admin");
      localStorage.setItem("adminId", response.adminId);
      setRole("admin");
      toast.success("Login successful!", { position: "top-right" }); // Success Toast
      navigate("/admin-dashboard");
    } else {
      toast.error("Invalid credentials", { position: "top-right" }); // Error Toast
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Admin Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
