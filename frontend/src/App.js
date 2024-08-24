import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About/About";
import Matching from "./components/Apartment-Matching/Matching";
import CustomerReviewsPage from "./components/Customer-Reviews/CustomerReviewsPage";
import Contact from "./components/Contact/Contact";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Homepage/Home";
import "./App.css";
import ApartmentPage from "./pages/ApartmentPage/ApartmentPage";
import RentApartmentsPage from "./pages/RentApartmentsPage/RentApartmentsPage";
import SalesApartmentsPage from "./pages/SalesApartmentsPage/SalesApartmentsPage";

// Comment

function App() {
  // const filteredForSaleApartments = forSaleApartments.filter(
  //   (apartments) => apartments.images !== null
  // );

  // const filteredForRentApartments = forRentApartments.filter(
  //   (apartments) => apartments.images !== null
  // );

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/matching" element={<Matching />} />
          <Route
            path="/customerreviewspage"
            element={<CustomerReviewsPage />}
          />
          <Route path="/contact" element={<Contact />} />
          {/* TODO: remove the sliceing */}
          <Route
            path="/for_sale_apartements"
            element={<SalesApartmentsPage title={"דירות למכירה"} />}
          />
          {/* TODO: remove the sliceing */}
          <Route
            path="/for_rent_apartements"
            element={<RentApartmentsPage title={"דירות להשכרה"} />}
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
