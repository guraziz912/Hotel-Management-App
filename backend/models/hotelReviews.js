const Sequelize = require('sequelize');
const sequelize = require('../database/databaseConnection');

// user model
const hotelReviews = sequelize.define('hotelReviews', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  hotelName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  review: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = hotelReviews;
