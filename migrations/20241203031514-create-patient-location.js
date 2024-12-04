"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PatientLocations", {
      id_location: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      id_patient: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Patients",
          key: "id_patient",
        },
      },
      location_latitude: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      location_longitude: {
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
    await queryInterface.dropTable("PatientLocations");
  },
};
