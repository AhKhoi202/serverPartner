"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProjectProgresses", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      projectId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      progressPercentage: {
        type: Sequelize.INTEGER,
      },
      currentStage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updateDate: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable("ProjectProgresses");
  },
};
