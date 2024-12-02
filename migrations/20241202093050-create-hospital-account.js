"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HospitalAccounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name_hospital: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email_hospital: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password_hospital: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      location_hospital: {
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
    await queryInterface.dropTable("HospitalAccounts");
  },
};
