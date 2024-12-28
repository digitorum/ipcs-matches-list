import { DataTypes, Model, Sequelize } from 'sequelize'

type MatchDisciplineAttributes = {
  matchId: number;
  disciplineId: number;
}

type MatchDisciplineCreationAttributes = MatchDisciplineAttributes

export class MatchDiscipline extends Model<MatchDisciplineAttributes, MatchDisciplineCreationAttributes> {
  declare matchId: number;
  declare disciplineId: number;

  static associate(sequelize: Sequelize) {
    MatchDiscipline.init({
      matchId: {
        allowNull: false,
        type: DataTypes.NUMBER,
        references: {
          model: {
            tableName: 'Matches'
          },
          key: 'id'
        }
      },
      disciplineId: {
        allowNull: false,
        type: DataTypes.NUMBER,

        references: {
          model: {
            tableName: 'Disciplines'
          },
          key: 'id'
        }
      }
    }, {
      sequelize,
      tableName: 'MatchDisciplines',
      timestamps: false
    })

    MatchDiscipline.removeAttribute('id')
  }
}
