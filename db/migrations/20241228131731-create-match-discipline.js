'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

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

      await queryInterface.addIndex('MatchDisciplines', {
        fields: ['matchId', 'disciplineId'],
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
    await queryInterface.dropTable('MatchDisciplines');
  }
};