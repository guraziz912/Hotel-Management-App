const StaticData = require('../models/staticData');

// Getting cities
const getStaticData = async () => {
  const staticDataFound = await StaticData.findAll();

  return staticDataFound;
};

module.exports = { getStaticData };
