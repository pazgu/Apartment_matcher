import React, { useState, useEffect } from "react";
import axios from "axios";
import ApartmentMinimalCard from "../../components/ApartmentMinimalCard/ApartmentMinimalCard";
import "./ApartmentsPage.css";
import FilterBar from "../../components/FilterBar/FilterBar";
import Pagination from "../../components/Pagination/Pagination";

const ApartmentsPage = ({ title, endpoint }) => {
  const [apartments, setApartments] = useState([]);
  // TODO: size should be the max size of the apartment? or the min size?
  const [filters, setFilters] = useState({
    rooms: "",
    size: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchApartments();
  }, [currentPage, filters]);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      // TODO: can we query from all the apartments and not just rent or sale?
      const response = await axios.get(
        `http://localhost:5000/api/apartments/${endpoint}?page=${currentPage}&limit=${itemsPerPage}`,
        {
          params: {
            beds: filters.rooms,
            size_m2: filters.size,
            price: filters.price,
          },
        }
      );
      setApartments(response.data.apartments);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="apartments-page-container">
      <h1>{title}</h1>

      <FilterBar handleFilterChange={handleFilterChange} filters={filters} />

      {loading ? (
        <div className="loading-alert">
          <div className="spinner"></div>
          <p>מחפש דירות תואמות, אנא המתן...</p>
        </div>
      ) : (
        <div>
          <div className="apartments-page-cards-wrapper">
            {apartments.map((apartment, index) => (
              <ApartmentMinimalCard key={index} apartment={apartment} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ApartmentsPage;
