'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Doctors', [
      {
        id_hospital: "c22a3415-2ee6-493c-b1ec-b2417d7138e5", // Example UUID, replace with actual hospital IDs
        doctor_name: 'Dr. John Doe',
        doctor_email: 'john.doe@example.com',
        doctor_password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_hospital: "9755c6d9-b1a5-4efa-9269-f08b86e6c38d", // Example UUID, replace with actual hospital IDs
        doctor_name: 'Dr. Jane Smith',
        doctor_email: 'jane.smith@example.com',
        doctor_password: 'password456',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_hospital: "f48c41fb-f9b7-43ce-b108-7ffc7d9c9056", // Example UUID, replace with actual hospital IDs
        doctor_name: 'Dr. Emily Johnson',
        doctor_email: 'emily.johnson@example.com',
        doctor_password: 'password789',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Doctors', null, {});
  }
};
