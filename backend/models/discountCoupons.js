const Sequelize = require('sequelize');
const sequelize = require('../database/databaseConnection');

// user model
const discoutCoupons = sequelize.define('discoutCoupons', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  couponName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  couponNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  discount: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = discoutCoupons;
