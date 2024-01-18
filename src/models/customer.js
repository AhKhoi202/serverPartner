'customer strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // define association here
      Customer.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });
    }
  }
  Customer.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      note: DataTypes.STRING,
      userId: DataTypes.STRING,
      estimatedCosts: DataTypes.FLOAT,
      companyName: DataTypes.STRING, 
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );

  return Customer;
};