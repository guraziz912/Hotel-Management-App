const Sequelize = require('sequelize');
const sequelize = require('../database/databaseConnection');

// user model
const hotels = sequelize.define('hotels', {
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
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  landmark: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  basePrice: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  starRating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  hotelType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = hotels;
