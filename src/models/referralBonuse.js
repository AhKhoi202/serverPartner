"use strict";
const { Model } = require("sequelize");
//Bảng này sẽ lưu trữ thông tin chi tiết về các khoản chiết khấu được tính cho mỗi người dùng dựa trên cấp độ giới thiệu của họ.
module.exports = (sequelize, DataTypes) => {
  class ReferralBonuses extends Model {
    static associate(models) {
      ReferralBonuses.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });
      ReferralBonuses.belongsTo(models.Project, {
        foreignKey: "projectId",
        targetKey: "id",
        as: "project",
      });
    }
  }
  ReferralBonuses.init(
    {
      userId: DataTypes.STRING,
      projectId: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      referralLevel: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ReferralBonuses",
    }
  );
  return ReferralBonuses;
};
