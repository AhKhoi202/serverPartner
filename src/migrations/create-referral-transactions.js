"referralTransaction strict";
//Bảng này quản lý thông tin về các giao dịch thanh toán hoặc chuyển khoản liên quan đến chiết khấu giới thiệu.
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ReferralTransactions ", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      referralBonusId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transactionType: {
        type: Sequelize.STRING,
        defaultValue: 'Thanh toán',
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ReferralTransactions");
  },
};
