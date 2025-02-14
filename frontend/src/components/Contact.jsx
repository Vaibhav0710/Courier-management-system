import React, { useState } from "react";
import emailjs from "@emailjs/browser";  // Import EmailJS
import { ToastContainer, toast } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import Toast CSS
import "./Contact.css";
import Thankyou from "../assets/Thankyou.webp";
import Footeer from "../components/Footeer";
import NaavBaar from "../components/NaavBaar";

function Contact() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Loading State
  const [isSending, setIsSending] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    setIsSending(true); // Disable button while sending

    // Secure Environment Variables
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        toast.success("Message sent successfully! ✅", {
          position: "top-right",
          autoClose: 3000,
        });
        setFormData({ name: "", email: "", message: "" }); // Clear form
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        toast.error("Failed to send message. ❌ Please try again.");
      })
      .finally(() => {
        setIsSending(false); // Re-enable button
      });
  };

  return (
    <div>
      <NaavBaar />
      <ToastContainer /> {/* Toast Notification Container */}
      <div className="contact-section">
        <div className="contact-image">
          <img src={Thankyou} alt="Contact Us" />
        </div>
        <div className="contact-form-container">
          <h2 className="title" style={{ color: "#0000FF", borderBottom: "3px solid #0000FF" }}>
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      <Footeer />
    </div>
  );
}

export default Contact;
