"use strict";
const { Model } = require("sequelize");
//Bảng này quản lý thông tin về các giao dịch thanh toán hoặc chuyển khoản liên quan đến chiết khấu giới thiệu.
module.exports = (sequelize, DataTypes) => {
  class ReferralTransactions extends Model {
    static associate(models) {
      ReferralTransactions.belongsTo(models.ReferralBonuses, {
        foreignKey: "referralBonusId",
      });
    }
  }
  ReferralTransactions.init(
    {
      referralBonusId: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      transactionType: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ReferralTransactions",
    }
  );
  return ReferralTransactions;
};
