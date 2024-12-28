'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Addresses', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        address: {
          allowNull: false,
          type: Sequelize.STRING
        },
        country: {
          allowNull: true,
          type: Sequelize.STRING
        },
        city: {
          allowNull: true,
          type: Sequelize.STRING
        }
      });

      await queryInterface.addIndex('Addresses', {
        fields: ['address'],
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
    await queryInterface.dropTable('Addresses');
  }
};
