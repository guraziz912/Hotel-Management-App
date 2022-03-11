const Sequelize = require('sequelize');
const sequelize = require('../database/databaseConnection');

// user model
const hotelAmenities = sequelize.define('hotelAmenities', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  hotelName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ameninity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = hotelAmenities;
