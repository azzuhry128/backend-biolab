"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Visits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      patientID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "patients",
          key: "id",
        },
      },
      doctorrID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "doctoraccounts",
          key: "id",
        },
      },
      hospitalID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "hospitalaccounts",
          key: "id",
        },
      },
      title_visit: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fee_visit: {
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
    await queryInterface.dropTable("Visits");
  },
};
