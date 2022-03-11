const masterDataService = require('../service/masterDataService');
const staticDataService = require('../service/staticDataService');
// response handler
const responseHandler = require('../utils/responseHandler');
// Success messages
const successMessages = require('../messages/success/index');
// Failure messages
const failureMessages = require('../messages/error/index');
// Custom Error
const CustomError = require('../middlewares/error');

const customError = new CustomError();

// Constants
const constants = require('../utils/constants');

// Fetching Hotel data
exports.fetchAmenities = async (req, res, next) => {
  const lang = req.body.headers['accept-language']; // selecting language
  try {
    const amenities = await masterDataService.getAllAmenities();
    if (!amenities) {
      return customError.apiError(
        constants.unauthorizeStatusCode,
        failureMessages[lang].amenitiesNotFound
      );
    }
    return responseHandler.successResponseData(
      res,
      constants.successStatusCode,
      successMessages[lang].amenitiesFound,
      amenities
    );
  } catch (error) {
    next(error);
  }
};

// Fetching Hotel data
exports.fetchStaticData = async (req, res, next) => {
  const lang = req.body.headers['accept-language']; // selecting language
  try {
    const staticDataFound = await staticDataService.getStaticData();
    if (!staticDataFound) {
      return customError.apiError(
        constants.unauthorizeStatusCode,
        failureMessages[lang].dataNotFound
      );
    }
    return responseHandler.successResponseData(
      res,
      constants.successStatusCode,
      successMessages[lang].dataFound,
      staticDataFound
    );
  } catch (error) {
    next(error);
  }
};
