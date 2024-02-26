"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PaymentProjects", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      projectId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Projects",
          key: "id",
        },
      },
      pay: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      paymentDate: {
        type: Sequelize.DATE,
      },
      paymentDeadline: {
        type: Sequelize.DATE,
      },
      proofImage: {
        type: Sequelize.TEXT,
      },
      note: {
        type: Sequelize.STRING,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PaymentProjects");
  },
};
