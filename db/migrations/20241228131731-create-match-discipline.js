'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MatchDisciplines', {
      matchId: {
        allowNull: false,
        type: Sequelize.NUMBER,
        references: {
          model: {
            tableName: 'Matches'
          },
          key: 'id'
        }
      },
      disciplineId: {
        allowNull: false,
        type: Sequelize.NUMBER,
        references: {
          model: {
            tableName: 'Disciplines'
          },
          key: 'id'
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MatchDisciplines');
  }
};