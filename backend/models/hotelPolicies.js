const Sequelize = require('sequelize');
const sequelize = require('../database/databaseConnection');

// user model
const hotelPolicies = sequelize.define('hotelPolicies', {
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
  policies: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = hotelPolicies;
