const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const {
  RentalApartment,
  SaleApartment,
} = require("../models/apartment.model..js");
const connectDB = require("./db.js");

// Function to read JSON file
const readJsonFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

// Function to save apartments to the database
const saveApartments = async (filePath, model) => {
  try {
    await model.deleteMany({});
    const apartments = await readJsonFile(filePath);
    await model.insertMany(apartments);
    console.log(
      `Successfully saved ${apartments.length} apartments from ${filePath}`
    );
  } catch (err) {
    console.error(`Error saving apartments from ${filePath}:`, err);
  }
};

const main = async () => {
  await connectDB();

  const rentalApartmentsFilePath = path.join(
    __dirname,
    "../data/for_rent_apartments (1).json"
  );
  const saleApartmentsFilePath = path.join(
    __dirname,
    "../data/for_sale_apartments (1).json"
  );

  await saveApartments(rentalApartmentsFilePath, RentalApartment);
  await saveApartments(saleApartmentsFilePath, SaleApartment);

  mongoose.disconnect();
};

main();
