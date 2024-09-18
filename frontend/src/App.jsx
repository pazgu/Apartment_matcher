import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import MatchingApartments from "./pages/MatchingApartments/MatchingApartments";
import ApartmentsPage from "./pages/ApartmentsPage/ApartmentsPage";
import ApartmentPage from "./pages/ApartmentPage/ApartmentPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";

import Matching from "./components/Apartment-Matching/Matching";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/matching-apartments" element={<MatchingApartments />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/for_sale_apartements"
            element={<ApartmentsPage title={"דירות למכירה"} endpoint="sale" />}
          />
          <Route
            path="/for_rent_apartements"
            element={<ApartmentsPage title={"דירות להשכרה"} endpoint="rent" />}
          />
          <Route path="/apartment/:id" element={<ApartmentPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
