'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Federations', [
      {
        name: 'IPSC',
        fullName: 'International Practical Shooting Confederation'
      },
      {
        name: 'IDPA',
        fullName: 'International Defensive Pistol Association'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // nothing
  }
};
