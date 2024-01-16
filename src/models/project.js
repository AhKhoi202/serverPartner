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
      expectedRevenue: DataTypes.FLOAT,
      actualRevenue: DataTypes.FLOAT,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      userId: DataTypes.STRING,
      customerId: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );

  return Project;
};
