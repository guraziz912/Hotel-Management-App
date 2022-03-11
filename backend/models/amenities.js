const Sequelize = require('sequelize');
const sequelize = require('../database/databaseConnection');

// user model
const amenities = sequelize.define('amenities', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  ameninity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = amenities;
