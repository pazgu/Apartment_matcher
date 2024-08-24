const express = require("express");
const router = express.Router();
const {
  getAllRentalApartments,
  getAllSaleApartments,
  getApartmentByIdRent,
  getApartmentByIdSale,
} = require("../controllers/apartment.controller");

router.get("/rent/:id", getApartmentByIdRent);
router.get("/sale/:id", getApartmentByIdSale);
router.get("/rent", getAllRentalApartments);
router.get("/sale", getAllSaleApartments);

module.exports = router;
