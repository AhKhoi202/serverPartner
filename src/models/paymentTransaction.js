"customer strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentTransaction extends Model {
    static associate(models) {
      // define association here
      PaymentTransaction.belongsTo(models.PaymentStage, {
        foreignKey: "paymentStageId",
        targetKey: "id",
        as: "paymentStage",
      });
    }
  }
  PaymentTransaction.init(
    {
      paymentStageId: DataTypes.STRING,
      pay: DataTypes.FLOAT,
      paymentDate: DataTypes.DATE,
      proofImage: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PaymentTransaction",
    }
  );

  return PaymentTransaction;
};
