'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Matches', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false
        },
        platformId: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'Platforms'
            },
            key: 'id'
          },
          allowNull: false,
        },
        federationId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: {
              tableName: 'Federations'
            },
            key: 'id'
          }
        },
        startDate: {
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        endDate: {
          type: Sequelize.DATEONLY,
          allowNull: true
        },
        level: {
          type: Sequelize.NUMBER,
          defaultValue: 0
        },
        exercisesCount: {
          type: Sequelize.NUMBER,
          defaultValue: 0
        },
        minimumShots: {
          type: Sequelize.NUMBER,
          defaultValue: 0
        },
        price: {
          type: Sequelize.STRING,
          defaultValue: ''
        },
        addressId: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'Addresses'
            },
            key: 'id'
          }
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

      await queryInterface.addIndex('Matches', {
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
    await queryInterface.dropTable('Matches');
  }
};