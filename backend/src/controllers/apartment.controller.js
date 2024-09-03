const { spawn } = require("child_process");
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

async function postUserMatchApartmentsForm(req, res) {
  //model files to run whenever user trying to find matching apartments
  const apartment_df_path_to_rent = "data/for_rent_apartments (1).json";
  const apartment_df_path_to_sale = "data/for_sale_apartments (1).json";

  const scaler_path_to_rent = "data/ML_modules/for_rent_preprocessor.pkl";
  const scaler_path_to_sale = "data/ML_modules/for_sale_preprocessor.pkl";

  const model_path_to_rent = "data/ML_modules/for_rent_clustering_model.pkl";
  const model_path_to_sale = "data/ML_modules/for_sale_clustering_model.pkl";

  try {
    const {
      rentOrSale,
      floor,
      beds,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      tags,
    } = req.body;

    const {
      families,
      light_trail,
      parks,
      quiet_street,
      religious,
      school,
      secular,
    } = tags;

    //detect user prefs which need to be sended to the model
    const user_prefs = {
      floor,
      beds,
      price: (minPrice + maxPrice) / 2,
      size_m2: (minSize + maxSize) / 2,
      families,
      light_trail,
      parks,
      quiet_street,
      religious,
      school,
      secular,
    };

    // Determine which model to use
    let ApartmentModel;
    let pythonProcess;

    if (rentOrSale === "rent") {
      ApartmentModel = RentalApartment;
      // Spawn a new Python process and pass the message as an argument
      pythonProcess = spawn("python", [
        "data/ML_modules/ApartmentMatcherAlgorithm.py",
        apartment_df_path_to_rent,
        JSON.stringify(user_prefs),
        scaler_path_to_rent,
        model_path_to_rent,
      ]);
    } else {
      ApartmentModel = SaleApartment;
      pythonProcess = spawn("python", [
        "data/ML_modules/ApartmentMatcherAlgorithm.py",
        apartment_df_path_to_sale,
        JSON.stringify(user_prefs),
        scaler_path_to_sale,
        model_path_to_sale,
      ]);
    }

    // Build the query
    // let query = {};

    // if (floor) query.floor = floor;
    // if (beds) query.beds = beds;
    // if (minPrice || maxPrice) {
    //   query.price = {};
    //   if (minPrice) query.price.$gte = minPrice;
    //   if (maxPrice) query.price.$lte = maxPrice;
    // }
    // if (minSize || maxSize) {
    //   query.size = {};
    //   if (minSize) query.size.$gte = minSize;
    //   if (maxSize) query.size.$lte = maxSize;
    // }
    // if (tags && tags.length > 0) {
    //   query.tags = { $all: tags };
    // }

    // const matchingApartments = await ApartmentModel.find(query);

    let result;
    // Collect data from the Python script
    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
      console.log("Python script output:", result);
      res.status(200).json({
        success: true,
        data: result,
      });
    });

    // Handle any errors
    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      console.log(`Python script exited with code ${code}`);
    });
  } catch (error) {
    console.error("Error in postUserMatchApartmentsForm:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
      error: error.message,
    });
  }
}

module.exports = {
  getAllRentalApartments,
  getAllSaleApartments,
  getApartmentByIdRent,
  getApartmentByIdSale,
  postUserMatchApartmentsForm,
};
