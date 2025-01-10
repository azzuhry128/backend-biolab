'use strict';

const service = require('../models/service');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Services', [
      {
        id_hospital: "c22a3415-2ee6-493c-b1ec-b2417d7138e5", // Example UUID, replace with actual hospital IDs
        id_category: "41170316-d3da-4c2a-83c0-f12d39953c8a", // Example UUID, replace with actual category IDs
        service_name: 'General Consultation',
        service_description: 'Basic health consultation and checkup',
        service_fee: '50.00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_hospital: "9755c6d9-b1a5-4efa-9269-f08b86e6c38d", // Example UUID, replace with actual hospital IDs
        id_category: "54f7dd15-d408-4e7e-99d1-0a89b095bbf5", // Example UUID, replace with actual category IDs
        service_name: 'Emergency Service',
        service_description: 'Immediate medical attention for emergencies',
        service_fee: '150.00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_hospital: "f48c41fb-f9b7-43ce-b108-7ffc7d9c9056", // Example UUID, replace with actual hospital IDs
        id_category: "a0ffeb51-6394-4523-976e-339d49a484cc", // Example UUID, replace with actual category IDs
        service_name: 'Specialist Consultation',
        service_description: 'Consultation with a medical specialist',
        service_fee: '100.00',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
  }
};
