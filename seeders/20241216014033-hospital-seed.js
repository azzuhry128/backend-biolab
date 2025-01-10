'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('HospitalAccounts', [
      {
        hospital_name: 'Jaya Medika',
        hospital_email: 'medika@gmail.com',
        hospital_password: 'password123',
        hospital_latitude: '34.0522',
        hospital_longitude: '-118.2437',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        hospital_name: 'Sehat Sentosa',
        hospital_email: 'sehat@gmail.com',
        hospital_password: 'password456',
        hospital_latitude: '40.7128',
        hospital_longitude: '-74.0060',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        hospital_name: 'Rumah Sakit Aman',
        hospital_email: 'aman@gmail.com',
        hospital_password: 'password789',
        hospital_latitude: '51.5074',
        hospital_longitude: '-0.1278',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('HospitalAccounts', null, {});
  }
};
