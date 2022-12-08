const { Sequelize, DataTypes } = require("sequelize");

exports.initdb = () => {
  const sequelize = new Sequelize("todos_db", "user-db", "pass-db", {
    host: "localhost",
    dialect: "mysql",
  });
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection to the database has been established!");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });

  const todoModel = sequelize.define("todo", {
    todo: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    is_enabled: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  });

  sequelize
    .sync()
    .then(() => {
      console.log("Todo table was created successfully!");
    })
    .catch((error) => {
      console.error("Unable to create Todo table: ", error);
    });

  return sequelize;
};
