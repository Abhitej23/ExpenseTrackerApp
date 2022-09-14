const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("exdbp", "root", "apple@17", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;