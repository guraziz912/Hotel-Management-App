const Sequelize = require('sequelize');
const sequelize = require('../database/databaseConnection');

// user model
const cities = sequelize.define('cities', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  totalHotels: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = cities;
