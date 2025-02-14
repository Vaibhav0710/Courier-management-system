import React from 'react';
import './Footeer.css';

const Footeer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-left">
          <ul>
            <li><strong>Contact:</strong> +91 73500 15955</li>
            <li><strong>Email:</strong> sovrsupport@gmail.com</li>
            <li><strong>Address:</strong> Hinjawadi Phase II, Rajiv Gandhi Infotech Park, Hinjawadi, Pimpri-Chinchwad, Maharashtra 411057</li>
          </ul>
        </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Courier Service Management. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footeer;
