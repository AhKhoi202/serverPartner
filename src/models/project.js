"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.Customer, {
        foreignKey: "customerId",
        targetKey: "id",
        as: "customer",
      });
      Project.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });
    }
  }

  Project.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      expected_revenue: DataTypes.FLOAT,
      actual_revenue: DataTypes.FLOAT,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      userId: DataTypes.STRING,
      customer_id: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );

  return Project;
};
