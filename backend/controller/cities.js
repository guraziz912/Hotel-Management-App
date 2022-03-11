const checkCity = require('../service/citiesService');
// response handler
const responseHandler = require('../utils/responseHandler');
// Success messages
const successMessages = require('../messages/success/index');
// Failure messages
const failureMessages = require('../messages/error/index');
const CustomError = require('../middlewares/error');

const customError = new CustomError();

// Constants
const constants = require('../utils/constants');

// Fetching Hotel data
exports.fetchCities = async (req, res, next) => {
  const { name } = req.body;
  const lang = req.body.headers['accept-language'];

  try {
    const cities = await checkCity.getCities(name);
    if (cities.length === 0) {
      return responseHandler.faliedAuthResponse(
        res,
        constants.unauthorizeStatusCode,
        failureMessages[lang].citiesNotFound
      );
    }
    return responseHandler.successResponseData(
      res,
      constants.successStatusCode,
      successMessages[lang].citiesFound,
      cities
    );
  } catch (error) {
    next(error);
  }
};

exports.fetchAllCities = async (req, res, next) => {
  const lang = req.body.headers['accept-language'];

  try {
    const cities = await checkCity.getCities();
    if (cities.length === 0) {
      return customError.apiError(
        constants.unauthorizeStatusCode,
        failureMessages[lang].citiesNotFound
      );
    }
    return responseHandler.successResponseData(
      res,
      constants.successStatusCode,
      successMessages[lang].citiesFound,
      cities
    );
  } catch (error) {
    next(error);
  }
};
