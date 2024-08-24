const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

const tagSchema = new Scheme({
  id: { type: String },
  tag_category: { type: String },
  tag_value: { type: Number },
});

const insightSchema = new Scheme({
  id: { type: String },
  insight_category: { type: String },
  insight_value: { type: String },
});

const imageSchema = new Scheme({
  id: { type: String },
  image_url: { type: String },
  image_id: { type: String },
});

const apartmentSchema = new Scheme({
  id: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  create_date: { type: Date },
  address: { type: String },
  city: { type: String },
  floor: { type: Number },
  deal_type: { type: String },
  beds: { type: Number },
  price: { type: Number },
  size_m2: { type: Number },
  condition: { type: String },
  url: { type: String },
  tags: [tagSchema],
  insights: [insightSchema],
  images: [imageSchema],
});

//handles errors may occur with duplicate key. Also, I refer to validation errors when I tried to save new apartment (see middleware function "addApartment")
apartmentSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Duplicate key error"));
  } else {
    next(error); //handle other errors
  }
});

const RentalApartment = mongoose.model(
  "RentalApartment",
  apartmentSchema,
  "rental_apartments"
);
const SaleApartment = mongoose.model(
  "SaleApartment",
  apartmentSchema,
  "sale_apartments"
);

module.exports = {
  RentalApartment,
  SaleApartment,
};
