const express = require("express");
const router = express.Router();
const {
  getAllRentalApartments,
  getAllSaleApartments,
  getApartmentByIdRent,
  getApartmentByIdSale,
  postUserMatchApartmentsForm,
} = require("../controllers/apartment.controller");

router.get("/rent/:id", getApartmentByIdRent);
router.get("/sale/:id", getApartmentByIdSale);
router.get("/rent", getAllRentalApartments);
router.get("/sale", getAllSaleApartments);
router.post("/match", postUserMatchApartmentsForm);

module.exports = router;
