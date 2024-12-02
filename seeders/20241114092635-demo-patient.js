'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Patients', [
      {
        fullname: "azzuhry",
        email: "azzuhry@gmail.com",
        password: "whatever",
        phone: "0821",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullname: "farhan",
        email: "farhan@gmail.com",
        password: "whatever2",
        phone: "0822",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullname: "dimas",
        email: "dimas@gmail.com",
        password: "whatever3",
        phone: "0823",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
