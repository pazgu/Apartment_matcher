import React, { useState, useEffect } from "react";
import axios from "axios";
import ApartmentMinimalCard from "../../components/ApartmentMinimalCard/ApartmentMinimalCard";
import "./RentApartmentsPage.css";

const RentApartmentsPage = ({ title }) => {
  const [apartments, setApartments] = useState([]);
  const [filters, setFilters] = useState({
    rooms: "",
    size: "",
    price: "",
  });

  useEffect(() => {
    fetchApartments();
  }, [filters]);

  const fetchApartments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/apartments/rent",
        {
          params: {
            beds: filters.rooms,
            size_m2: filters.size,
            price: filters.price,
          },
        }
      );
      setApartments(response.data.apartments);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  console.log(apartments);

  return (
    <div className="apartments-page-container">
      <h1>{title}</h1>

      {/* Filter Controls */}
      <div className="filters-container">
        <label>
          מספר חדרים:
          <input
            type="number"
            name="rooms"
            value={filters.rooms}
            onChange={handleFilterChange}
            placeholder="בחר מספר חדרים"
          />
        </label>
        <label>
          גודל חדר (מ"ר):
          <input
            type="number"
            name="size"
            value={filters.size}
            onChange={handleFilterChange}
            placeholder="בחר גודל חדר"
          />
        </label>
        <label>
          מחיר מקסימלי:
          <input
            type="number"
            name="price"
            value={filters.price}
            onChange={handleFilterChange}
            placeholder="בחר מחיר מקסימלי"
          />
        </label>
      </div>

      <div className="apartments-page-cards-wrapper">
        {apartments.map((apartment, index) => {
          return <ApartmentMinimalCard key={index} apartment={apartment} />;
        })}
      </div>
    </div>
  );
};

export default RentApartmentsPage;
