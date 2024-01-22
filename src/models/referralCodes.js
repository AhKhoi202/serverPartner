"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReferralCode extends Model {
    static associate(models) {
      ReferralCode.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id", // Hoặc targetKey: "userId" tùy thuộc vào trường khóa chính của User
        as: "creator",
      });

      // Mỗi mã giới thiệu có thể được sử dụng bởi nhiều người dùng (referredUsers)
      ReferralCode.hasMany(models.User, {
        foreignKey: "referralCode",
        sourceKey: "code", // Liên kết với trường "code" trong ReferralCode
        as: "referredUsers",
      });

    }
  }
  ReferralCode.init(
    {
      code: DataTypes.STRING,
      userId: DataTypes.STRING,
      UsageCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ReferralCode",
    }
  );
  return ReferralCode;
};
