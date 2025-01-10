'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NewVisits', {
      id_visit: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      id_patient: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Patients", // name of the referenced table
          key: "id_patient", // column in the referenced table
        },
      },
      id_doctor: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Doctors", // name of the referenced table
          key: "id_doctor", // column in the referenced table
        },
      },
      id_hospital: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "HospitalAccounts", // name of the referenced table
          key: "id_hospital", // column in the referenced table
        },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name_visit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fee_visit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NewVisits');
  }
};