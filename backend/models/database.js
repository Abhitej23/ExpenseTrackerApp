const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expdbproject", "root", "apple@17", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;