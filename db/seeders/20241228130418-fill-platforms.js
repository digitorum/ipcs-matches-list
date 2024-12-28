'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Platforms', [
      {
        id: 1,
        name: 'MakeReady',
        url: 'https://www.makeready.ru'
      },
      {
        id: 2,
        name: 'Atlima',
        url: 'https://atlima.com'
      },
      {
        id: 3,
        name: 'MATCH DAY',
        url: 'https://md.ipsc.ru/'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
