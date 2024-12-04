'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HospitalAccounts', {
      id_hospital: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      hospital_name: {
        type: Sequelize.STRING
      },
      hospital_email: {
        type: Sequelize.STRING
      },
      hospital_password: {
        type: Sequelize.STRING
      },
      hospital_latitude: {
        type: Sequelize.STRING
      },
      hospital_longitude: {
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
    await queryInterface.dropTable('HospitalAccounts');
  }
};