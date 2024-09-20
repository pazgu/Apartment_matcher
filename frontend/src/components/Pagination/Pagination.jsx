import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  let startPage = currentPage - 4;
  let endPage = currentPage + 5;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(totalPages, 10);
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - 9);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-container">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        First
      </button>

      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
