import React, { useState, useEffect } from "react";
import axios from "axios";
import ApartmentMinimalCard from "../../components/ApartmentMinimalCard/ApartmentMinimalCard";
import "./ApartmentsPage.css";
import FilterBar from "../../components/FilterBar/FilterBar";

const ApartmentsPage = ({ title, endpoint }) => {
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
        `http://localhost:5000/api/apartments/${endpoint}`,
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

      <FilterBar handleFilterChange={handleFilterChange} filters={filters} />

      <div className="apartments-page-cards-wrapper">
        {apartments.map((apartment, index) => {
          return <ApartmentMinimalCard key={index} apartment={apartment} />;
        })}
      </div>
    </div>
  );
};

export default ApartmentsPage;
