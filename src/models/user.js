"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        targetKey: "id",
        as: "role",
      });
      User.belongsTo(models.Role, {
        foreignKey: "referral_code",
        targetKey: "id",
        as: "user",
      });  
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      career: DataTypes.STRING,
      roleId: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      referral_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
