const Sequelize = require('sequelize');
const sequelize = require('../database/databaseConnection');

// user model
const bookings = sequelize.define('bookings', {
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
  roomType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rooms: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  guestName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  totalPrice: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adults: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  children: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  checkIn: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
  checkOut: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
});

module.exports = bookings;
