const express = require('express');

const masterDataController = require('../controller/masterData');

const masterDataRouter = express.Router();

// General Amenities route
masterDataRouter.post('/amenities', masterDataController.fetchAmenities);
// static data route
masterDataRouter.post('/staticData', masterDataController.fetchStaticData);

module.exports = masterDataRouter;
