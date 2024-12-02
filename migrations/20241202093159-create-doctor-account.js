"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DoctorAccounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hospitalID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "hospitalaccounts",
          key: "id",
        },
      },
      doctor_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      doctor_email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      doctor_phone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      doctor_password: {
        allowNull: false,
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
    await queryInterface.dropTable("DoctorAccounts");
  },
};
