'customer strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      companyName: DataTypes.STRING, // Thêm dòng này
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );

  return Customer;
};