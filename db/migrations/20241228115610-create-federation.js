'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Federations', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        fullName: {
          allowNull: true,
          type: Sequelize.STRING
        }
      });

      await queryInterface.addIndex('Federations', {
        fields: ['name'],
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
    await queryInterface.dropTable('Federations');
  }
};