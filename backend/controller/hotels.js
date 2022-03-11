const checkHotel = require('../service/hotelService');
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
exports.fetchHotelData = async (req, res, next) => {
  const { hotelName, headers } = req.body;
  const lang = headers['accept-language']; // selecting language

  try {
    const hotel = await checkHotel.getHotelByName(hotelName);
    if (!hotel) {
      return customError.apiError(
        constants.unauthorizeStatusCode,
        failureMessages[lang].NoHotelFound
      );
    }
    return responseHandler.successResponseData(
      res,
      constants.successStatusCode,
      successMessages[lang].hotelFound,
      hotel
    );
  } catch (error) {
    next(error);
  }
};

// Fetching Hotels
exports.fetchHotels = async (req, res, next) => {
  const { name } = req.body;
  const lang = req.body.headers['accept-language'];
  try {
    const hotels = await checkHotel.getHotels(name);
    if (hotels.length === 0) {
      return customError.apiError(
        constants.unauthorizeStatusCode,
        failureMessages[lang].NoHotelFound
      );
    }
    return responseHandler.successResponseData(
      res,
      constants.successStatusCode,
      successMessages[lang].hotelFound,
      hotels
    );
  } catch (error) {
    next(error);
  }
};

// Filter Hotels
exports.filterHotels = async (req, res, next) => {
  const { city, filter } = req.body;
  const {
    selectedAmenities,
    selectedPrice,
    selectedHotelType,
    selectedStarRating,
    freeBreakfast,
    freeCancelation,
  } = filter;

  const lang = req.body.headers['accept-language'];
  try {
    const filteredHotels = await checkHotel.getFilteredHotels(
      selectedAmenities,
      selectedPrice,
      selectedHotelType,
      selectedStarRating,
      freeBreakfast,
      freeCancelation,
      city
    );

    return responseHandler.successResponseData(
      res,
      constants.successStatusCode,
      successMessages[lang].hotelFound,
      filteredHotels
    );
  } catch (error) {
    next(error);
  }
};
