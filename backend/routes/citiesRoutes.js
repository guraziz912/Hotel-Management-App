const express = require('express');

const citiesController = require('../controller/cities');

const citiesRouter = express.Router();

// Cities route
citiesRouter.post('/searchedCity', citiesController.fetchCities);

// Cities route
citiesRouter.post('/cities', citiesController.fetchAllCities);

module.exports = citiesRouter;
