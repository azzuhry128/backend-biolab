"use strict";
/** @type {import('sequelize-cli').Migration} */
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("visits", {
      id_visit: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
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
      id_payment: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "PatientPayments", // name of the referenced table
          key: "id_payment", // column in the referenced table
        },
      },
      name_visit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fee_visit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rating_visit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      score_visit: {
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("visits");
  },
};
