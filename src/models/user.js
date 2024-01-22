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
      User.belongsTo(models.ReferralCode, {
        foreignKey: "referralCode",
        targetKey: "code",
        as: "referral",
      }); 
      User.belongsTo(models.ReferralCode, {
        foreignKey: "id",
        targetKey: "userId",
        as: "code",
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
      referralCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
