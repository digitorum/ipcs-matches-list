'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Locations', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        location: {
          allowNull: false,
          type: Sequelize.STRING
        },
        cityId: {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'Cities'
            },
            key: 'id'
          }
        }
      });

      await queryInterface.addIndex('Locations', {
        fields: ['location'],
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
    await queryInterface.dropTable('Location');
  }
};
