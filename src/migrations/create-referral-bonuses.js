"referralBonuse strict";
//Bảng này sẽ lưu trữ thông tin chi tiết về các khoản chiết khấu được tính cho mỗi người dùng dựa trên cấp độ giới thiệu của họ.
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ReferralBonuses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projectId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      referralLevel: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("ReferralBonuses");
  },
};
