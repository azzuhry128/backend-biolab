"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Doctors", {
      id_doctor: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      id_hospital: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "HospitalAccounts",
          key: "id_hospital",
        },
      },
      doctor_name: {
        type: Sequelize.STRING,
      },
      doctor_email: {
        type: Sequelize.STRING,
      },
      doctor_password: {
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
    await queryInterface.dropTable("Doctors");
  },
};
