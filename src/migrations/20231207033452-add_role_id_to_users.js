'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'roleId', {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'Roles', // Tên bảng bạn muốn tham chiếu
        key: 'id',       // Tên cột bạn muốn tham chiếu
      },
      onUpdate: 'CASCADE',
      onDelete: 'r2',
    });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('Users', 'roleId');
      // await queryInterface.dropTable('users');
     
  }
};
