const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.SCHMEMA_NAME,
  process.env.DB_SERVER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    define: {
      timestamps: false,
    },
  }
);
module.exports = sequelize;
