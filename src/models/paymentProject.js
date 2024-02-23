"customer strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentProject extends Model {
    static associate(models) {
      // define association here
      PaymentProject.belongsTo(models.Project, {
        foreignKey: "projectId",
        targetKey: "id",
        as: "project",
      });
    }
  }
  PaymentProject.init(
    {
      name: DataTypes.STRING,
      projectId: DataTypes.STRING,
      pay: DataTypes.FLOAT,
      paymentDeadline: DataTypes.DATE,
      paymentDate: DataTypes.DATE,
      proofImage: DataTypes.TEXT,
      note: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PaymentProject",
    }
  );

  return PaymentProject;
};
