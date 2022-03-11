const Sequelize = require('sequelize');

const { Op } = Sequelize;
const Cities = require('../models/cities');

// Getting cities
const getCities = async (name) => {
  let cities = [];
  if (name) {
    cities = await Cities.findAll({
      where: {
        city: {
          [Op.like]: `%${name}%`,
        },
      },
    });
  } else {
    cities = await Cities.findAll();
  }
  return cities;
};

module.exports = { getCities };
