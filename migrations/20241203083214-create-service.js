'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Services', {
      id_service: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      id_hospital: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "HospitalAccounts",
          key:"id_hospital"
        }
      },
      service_name: {
        type: Sequelize.STRING
      },
      service_description: {
        type: Sequelize.STRING
      },
      service_fee: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Services');
  }
};