"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customerId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expectedRevenue: {
        type: Sequelize.FLOAT,
      },
      actualRevenue: {
        type: Sequelize.FLOAT,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,

        defaultValue: "Chưa giải quyết",
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
    await queryInterface.dropTable("Projects");
  },
};
