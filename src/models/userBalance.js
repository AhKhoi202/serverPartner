"use strict";
const { Model } = require("sequelize");
//bảng để theo dõi số dư hiện tại của người dùng
module.exports = (sequelize, DataTypes) => {
  class UserBalances extends Model {
    static associate(models) {
      UserBalances.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  UserBalances.init(
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      balance: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "UserBalances",
    }
  );
  return UserBalances;
};
