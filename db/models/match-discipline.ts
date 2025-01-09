import { DataTypes, Sequelize } from 'sequelize'
import { AbstractModel } from './abstract';

type MatchDisciplineAttributes = {
  matchId: number;
  disciplineId: number;
}

type MatchDisciplineCreationAttributes = MatchDisciplineAttributes

export class MatchDiscipline extends AbstractModel<MatchDisciplineAttributes, MatchDisciplineCreationAttributes> {
  declare matchId: number;
  declare disciplineId: number;
}

export class MatchDisciplineFabric {
  static init(sequelize: Sequelize) {

    const model = MatchDiscipline.init({
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
      modelName: 'matchDisciplines',
      timestamps: false
    })

    model.removeAttribute('id')

    return model
  }
}