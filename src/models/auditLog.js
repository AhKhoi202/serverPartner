"use strict";
const { Model } = require("sequelize");
//: Bảng này có thể được sử dụng để ghi lại tất cả các thay đổi liên quan đến chiết khấu và giao dịch
module.exports = (sequelize, DataTypes) => {
  class AuditLogs extends Model {
    static associate(models) {
      // Associations can be defined here
    }
  }
  AuditLogs.init(
    {
      action: DataTypes.STRING,
      entityType: DataTypes.STRING,
      entityId: DataTypes.STRING,
      details: DataTypes.TEXT,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AuditLogs",
    }
  );
  return AuditLogs;
};
