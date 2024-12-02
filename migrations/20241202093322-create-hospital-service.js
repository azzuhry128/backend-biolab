"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HospitalServices", {
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
      name_service: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description_service: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fee_service: {
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
    await queryInterface.dropTable("HospitalServices");
  },
};
