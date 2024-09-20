import React from "react";
import "./Header.css";
import amlogo from "../../assets/amlogo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <nav className="header-navbar">
        <ul className="header-nav-links">
          <li>
            <a href="/">דף הבית</a>
          </li>
          <li>
            <a href="/matching">התאמת דירה</a>
          </li>
          <li>
            <a href="/for_sale_apartements">דירות למכירה</a>
          </li>
          <li>
            <a href="/for_rent_apartements">דירות להשכרה</a>
          </li>
          <li>
            <a href="/about">אודות</a>
          </li>
          <li>
            <a href="/contact">צור קשר</a>
          </li>
        </ul>
      </nav>
      <div className="header-logo" onClick={() => navigate("/")}>
        <span>Apartment Matcher</span>
        <img src={amlogo} alt="Company Logo" className="header-logo-image" />
      </div>
    </header>
  );
};

export default Header;
