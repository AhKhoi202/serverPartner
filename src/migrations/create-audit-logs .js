"auditLog strict";
//Bảng này có thể được sử dụng để ghi lại 
//tất cả các thay đổi liên quan đến chiết khấu và giao dịch, giúp đảm bảo tính minh bạch và dễ dàng kiểm toán.
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AuditLogs ", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      entityId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      action: {
        type: Sequelize.STRING,
      },
      entityType: {
        type: Sequelize.STRING,
      },
      details: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("AuditLogs");
  },
};
