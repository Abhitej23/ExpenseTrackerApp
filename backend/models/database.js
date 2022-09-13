const {Sequelize }= require("sequelize");

const sequelize = new Sequelize("exdb", "root", "apple@17", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
