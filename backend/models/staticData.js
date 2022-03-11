const Sequelize = require('sequelize');
const sequelize = require('../database/databaseConnection');

// user model
const staticData = sequelize.define('staticData', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = staticData;
