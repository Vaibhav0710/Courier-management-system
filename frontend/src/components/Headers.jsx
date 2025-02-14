import React from "react";

const Header = ({ title, subtitle }) => {
  return (
    <div className="mb-4">
      <h2 className="fw-bold text-dark mb-2">{title}</h2>
      <h5 className="text-success">{subtitle}</h5>
    </div>
  );
};

export default Header;
