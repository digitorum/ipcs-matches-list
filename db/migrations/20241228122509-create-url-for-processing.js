'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('UrlsForProcessing', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        url: {
          allowNull: false,
          type: Sequelize.STRING
        },
        platform: {
          allowNull: false,
          type: Sequelize.STRING
        },
        status: {
          allowNull: false,
          type: Sequelize.NUMBER
        },
        tries: {
          type: Sequelize.NUMBER,
          defaultValue: 0
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

      await queryInterface.addIndex('UrlsForProcessing', {
        fields: ['url'],
        unique: true,
        transaction,
      });
      
      await transaction.commit();
    } catch(err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UrlsForProcessing');
  }
};
