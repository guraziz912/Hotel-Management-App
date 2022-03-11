const Amenities = require('../models/amenities');

// Getting Amenities
const getAllAmenities = async () => {
  const hotelFound = await Amenities.findAll();

  return hotelFound;
};

module.exports = { getAllAmenities };
