import React from "react";
import NaavBaar from "../components/NaavBaar";  // Import Navbar component
import "./Feedbacks.css";
import Footeer from "../components/Footeer";

const feedbackData = [
  {
    id: 1,
    name: "Om Naphade",
    place: "Akola",
    feedback: "Awesome Delivery!",
    review: "Lorem ipsum praesent ac massa at ligula reet est iaculis. Vivamus est mist aliquet elit ac nisl.",
    stars: 5,
    image: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 2,
    name: "Sarang Raipurkar",
    place: "Pune",
    feedback: "Amazing service!",
    review: "Lorem ipsum praesent ac massa at ligula reet est iaculis. Vivamus est mist aliquet elit ac nisl.",
    stars: 5,
    image: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    id: 3,
    name: "Vaibhav Jain",
    place: "Mumbai",
    feedback: "Fast delivery!",
    review: "Lorem ipsum praesent ac massa at ligula reet est iaculis. Vivamus est mist aliquet elit ac nisl.",
    stars: 5,
    image: "https://randomuser.me/api/portraits/women/47.jpg"
  }
];

const Feedbacks = () => {
  return (
    <>
      <NaavBaar /> {/* Include Navbar at the top */}
      <div className="feedbacks-container">
        {feedbackData.map((feedback) => (
          <div key={feedback.id} className="feedback-card">
            <div className="quote">&ldquo;</div>
            <h3 className="feedback-title">{feedback.feedback}</h3>
            <p className="feedback-text">{feedback.review}</p>
            <div className="stars">{"\u2B50".repeat(feedback.stars)}</div>
            <div className="user-info">
              <img src={feedback.image} alt={feedback.name} className="user-image" />
              <div>
                <p className="user-name">{feedback.name}</p>
                <p className="user-role">{feedback.place}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footeer/>
    </>
  );
};

export default Feedbacks;
