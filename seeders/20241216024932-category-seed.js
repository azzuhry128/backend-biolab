'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        category_name: 'General Checkup',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_name: 'Emergency',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_name: 'Specialist Consultation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        category_name: 'Dental Services', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }, 
      { 
        category_name: 'Cardiology', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }, 
      { 
        category_name: 'Pediatrics', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
