import React from "react";
import "./About.css";
import about1 from "../assets/about1.jpg";
import about3 from "../assets/about3.jpeg";
import about2 from "../assets/about2.jpeg";
import Footeer from "./Footeer";
import NaavBaar from "./NaavBaar";

function About() {
  const sections = [
    {
      image: about1,
      text: "At SOVR, we are committed to providing fast, secure, and dependable logistics solutions. With our focus on timely deliveries and safe handling of goods, we ensure that your shipments arrive at their destination without delay. Whether you're sending a small parcel or managing large-scale logistics, we offer services that cater to all your needs.",
    },
    {
      image: about2,
      text: "Our advanced tracking technology and efficient systems enable real-time monitoring, ensuring peace of mind every step of the way. We serve businesses and individuals across a wide range of industries, offering customized solutions designed to streamline operations and enhance customer satisfaction. No matter where you are, our vast network ensures your packages are delivered swiftly and securely.",
    },
    {
      image: about3,
      text: "Trusted by thousands of clients, we have built a reputation for excellence in logistics. From local deliveries to international shipping, we’ve earned the trust of businesses and individuals alike, thanks to our commitment to reliability and customer-first approach. Our diverse fleet and innovative solutions ensure your shipments are in the best hands.",
    },
  ];

  return (
    <div>
      <NaavBaar/>
      <div className="about-container">
      <h4 className="title flash-title">
        About Us
      </h4>
      {sections.map((section, index) => (
        <div key={index} className={`about-section ${index % 2 === 0 ? "left" : "right"}`}>
          <div className="about-image">
            <img src={section.image} alt={`Section ${index + 1}`} />
          </div>
          <div className="about-text">{section.text}</div>
        </div>
      ))}
      </div>  
      <Footeer/>
    </div>
  );
}

export default About;
