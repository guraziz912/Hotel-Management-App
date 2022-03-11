const express = require('express');

const hotelController = require('../controller/hotels');

const hotelRouter = express.Router();

// hotelDetail route
hotelRouter.post('/hotelDetail', hotelController.fetchHotelData);

// hotel Listing Route
hotelRouter.post('/hotelListing', hotelController.filterHotels);

// filtered hotel Listing Route
// hotelRouter.post('/filteredHotels', hotelController.filterHotels);
module.exports = hotelRouter;
