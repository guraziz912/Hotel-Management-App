const Sequelize = require('sequelize');
const sequelize = require('../database/databaseConnection');

// user model
const rooms = sequelize.define('rooms', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  roomOptions: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  roomInclusions: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = rooms;
