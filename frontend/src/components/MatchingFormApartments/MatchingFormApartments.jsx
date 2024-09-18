import React from "react";
import { useLocation } from "react-router-dom";
import ApartmentMinimalCard from "../../components/ApartmentMinimalCard/ApartmentMinimalCard";
import "./MatchingFormApartments.css";

const MatchingFormApartments = () => {
  const location = useLocation();
  const apartments = location.state?.apartments || []; // Get the apartments from the location state

  return (
    <div className="apartments-page-container">
      <h1>דירות תואמות</h1>
      <p>להלן הדירות שהכי מתאימות עבורך:</p>
      <div className="apartments-page-cards-wrapper">
        {apartments.length > 0 ? (
          apartments.map((apartment, index) => (
            <ApartmentMinimalCard key={index} apartment={apartment} />
          ))
        ) : (
          <p>אין דירות תואמות בהתאם לפרטים שהזנת.</p>
        )}
      </div>
    </div>
  );
};

export default MatchingFormApartments;
