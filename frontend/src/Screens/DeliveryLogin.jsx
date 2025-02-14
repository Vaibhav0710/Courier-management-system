import NaavBaar from "../components/NaavBaar";
import "./UserLogin.css";
import { useNavigate } from "react-router-dom";
import { loginDeliveryPartner } from "../Services/DeliveryAdminauth.service"; // Import API function
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS

function DeliveryLogin() {
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // Call API
      const response = await loginDeliveryPartner({ email, password });

      if (response && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userType", "delivery_partner");
        localStorage.setItem("deliveryAgentID", response.deliveryAgentID);
        localStorage.setItem("earnings", response.earnings);

        toast.success("Login successful!", { position: "top-right" }); // Success Toast
        navigate("/delivery-agent-home");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error("Invalid credentials", { position: "top-right" }); // Error Toast
    }
  };

  return (
    <div className="delivery-page">
      <NaavBaar />
      <div className="container">
        <div className="card">
          <h2>Delivery Partner Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />

            <button className="customButton" type="submit">
              Login
            </button>
            <div>
              Don't have an account?{" "}
              <a href="/delivery-register">Register here</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeliveryLogin;
