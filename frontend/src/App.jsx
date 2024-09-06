import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About/About";
import Matching from "./components/Apartment-Matching/Matching";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Homepage/Home";
import "./App.css";
import ApartmentPage from "./pages/ApartmentPage/ApartmentPage";
import MatchingFormApartments from "./components/MatchingFormApartments/MatchingFormApartments";
import ApartmentsPage from "./pages/ApartmentsPage/ApartmentsPage";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/matching" element={<Matching />} />
          <Route
            path="/matching-apartments"
            element={<MatchingFormApartments />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/for_sale_apartements"
            element={<ApartmentsPage title={"דירות למכירה"} endpoint="sale" />}
          />
          <Route
            path="/for_rent_apartements"
            element={<ApartmentsPage title={"דירות להשכרה"} endpoint="rent" />}
          />
          <Route path="/apartment/:id" element={<ApartmentPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
