"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn("Users", "referral_code", {
    //   type: Sequelize.STRING,
    //   allowNull: true,
    // });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "referral_code");
  },
};
