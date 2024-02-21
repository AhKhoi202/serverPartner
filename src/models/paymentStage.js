"customer strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentStage extends Model {
    static associate(models) {
      // define association here
      PaymentStage.belongsTo(models.ReferralBonuses, {
        foreignKey: "referralBonusesId",
        targetKey: "id",
        as: "referralBonuses",
      });
    }
  }
  PaymentStage.init(
    {
      referralBonusesId: DataTypes.STRING,
      totalAmount: DataTypes.FLOAT,
      paid: DataTypes.FLOAT,
      description: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PaymentStage",
    }
  );

  return PaymentStage;
};
