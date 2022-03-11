const Sequelize = require('sequelize');

const { Op } = Sequelize;

const Amenities = require('../models/hotelAmenities');
const HotelPolicies = require('../models/hotelPolicies');
const HotelReviews = require('../models/hotelReviews');
const Hotels = require('../models/hotels');
const Rooms = require('../models/rooms');

// Getting hotel by name
const getHotelByName = async (name) => {
  const hotelFound = await Hotels.findOne({
    where: { hotelName: name },
    include: [
      {
        model: Rooms,
        attributes: [
          'id',
          'type',
          'price',
          'roomOptions',
          'image',
          'roomInclusions',
        ],
      },
      {
        model: Amenities,
        attributes: ['id', 'ameninity'],
      },
      {
        model: HotelPolicies,
        attributes: ['id', 'policies'],
      },
      {
        model: HotelReviews,
        attributes: ['id', 'review', 'username', 'rating'],
      },
    ],
  });

  return hotelFound;
};

// Getting all the hotels by city
const getHotels = async (name) => {
  const hotelsFound = await Hotels.findAll({
    where: { city: name },
    include: {
      model: Amenities,
      attributes: ['id', 'ameninity'],
    },
  });
  return hotelsFound;
};

// Getting all the hotels by filtering
const getFilteredHotels = async (
  selectedAmenities,
  selectedPrice,
  selectedHotelType,
  selectedStarRating,
  freeBreakfast,
  freeCancelation,
  city
) => {
  const whereClause = [{ city }];
  // filtering according to price
  if (selectedPrice.length !== 0) {
    // setting min price and max price with or and between operators
    const a = selectedPrice.map((item) => {
      const obj = {};
      obj.basePrice = { [Op.between]: item };
      return obj;
    });

    whereClause.push({
      [Op.or]: [...a],
    });
  }
  // filtering according to selected amenities
  if (selectedAmenities.length !== 0) {
    whereClause.push({
      $ameninity$: selectedAmenities,
    });
  }

  // filtering according to hotel type
  if (selectedHotelType.length > 0) {
    whereClause.push({
      hotelType: { [Op.and]: selectedHotelType },
    });
  }

  // filtering according to star rating
  if (selectedStarRating.length > 0) {
    whereClause.push({ starRating: { [Op.in]: selectedStarRating } });
  }

  // filtering according to if breakfast available
  if (freeBreakfast !== null || freeBreakfast === '') {
    whereClause.push({ $roomInclusions$: freeBreakfast });
  }

  // filtering according to if cancelation available
  if (freeCancelation !== null || freeCancelation === '') {
    whereClause.push({ $roomOptions$: freeCancelation });
  }

  const hotelsFound = await Hotels.findAll({
    where: whereClause, // [{ [Op.or]: whereClause }],

    include: [
      {
        model: Amenities,
        attributes: ['id', 'ameninity'],
      },
      {
        model: Rooms,
        attributes: [
          'id',
          'type',
          'price',
          'roomOptions',
          'image',
          'roomInclusions',
        ],
      },
    ],
  });
  return hotelsFound;
};
module.exports = { getHotelByName, getHotels, getFilteredHotels };
