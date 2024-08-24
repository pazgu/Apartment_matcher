const {
  RentalApartment,
  SaleApartment,
} = require("../models/apartment.model.");

// For Rental Apartments
async function getAllRentalApartments(req, res) {
  await getAllApartments(req, res, RentalApartment);
}

// For Sale Apartments
async function getAllSaleApartments(req, res) {
  await getAllApartments(req, res, SaleApartment);
}

// For Apartment by id for sale
async function getApartmentByIdSale(req, res) {
  await getApartmentById(req, res, SaleApartment);
}

// For Apartment by id for rent
async function getApartmentByIdRent(req, res) {
  await getApartmentById(req, res, RentalApartment);
}

async function getAllApartments(req, res, ApartmentModel) {
  try {
    const {
      name,
      tag,
      city,
      floor,
      beds,
      price,
      size_m2,
      condition,
      deal_type,
      page = 1,
      limit = 20,
    } = req.query;

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    const filterCriteria = {};

    if (name) {
      filterCriteria.name = { $regex: name, $options: "i" };
    }
    if (tag) {
      filterCriteria.tags = { $in: [tag] };
    }
    if (city) {
      filterCriteria.city = { $regex: city, $options: "i" };
    }
    if (floor) {
      filterCriteria.floor = parseInt(floor, 10);
    }
    if (beds) {
      filterCriteria.beds = parseInt(beds, 10);
    }
    if (price) {
      filterCriteria.price = { $lte: parseInt(price, 10) };
    }
    if (size_m2) {
      filterCriteria["size_m^2"] = { $gte: parseInt(size_m2, 10) };
    }
    if (condition) {
      filterCriteria.condition = condition;
    }
    if (deal_type) {
      filterCriteria.deal_type = deal_type;
    }

    const skip = (pageNumber - 1) * pageSize;

    const apartments = await ApartmentModel.find(filterCriteria)
      .skip(skip)
      .limit(pageSize);

    const totalApartments = await ApartmentModel.countDocuments(filterCriteria);

    return res.status(200).json({
      apartments,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalApartments / pageSize),
        totalApartments,
      },
    });
  } catch (error) {
    console.log(
      "apartment.controller, getAllApartments. Error while getting apartments",
      error
    );
    res.status(500).json({ message: "Error retrieving apartments" });
  }
}

async function getApartmentById(req, res, ApartmentModel) {
  try {
    const { id } = req.params;

    const apartment = await ApartmentModel.findById(id);

    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    return res.status(200).json(apartment);
  } catch (error) {
    console.log(
      "apartment.controller, getApartmentById. Error while getting apartment by ID",
      error
    );
    res.status(500).json({ message: "Error retrieving apartment" });
  }
}

async function postUserMatchApartmentForm(req, res, ApartmentModel) {
  try {
  } catch (error) {}
}

module.exports = {
  getAllRentalApartments,
  getAllSaleApartments,
  getApartmentByIdRent,
  getApartmentByIdSale,
  postUserMatchApartmentForm,
};
