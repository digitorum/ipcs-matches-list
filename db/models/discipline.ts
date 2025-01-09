import type { Optional } from 'sequelize'

import { DataTypes, Sequelize } from 'sequelize'
import { AbstractModel } from './abstract';

type DisciplineAttributes = {
  id: number;
  name: string;
}

type DisciplineCreationAttributes = Optional<DisciplineAttributes, 'id'>

export class Discipline extends AbstractModel<DisciplineAttributes, DisciplineCreationAttributes> {
  declare id: number;
  declare name: string;
}

export class DisciplineFabric {
  static init(sequelize: Sequelize) {
    return Discipline.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    }, {
      sequelize,
      tableName: 'Disciplines',
      modelName: 'discipline',
      timestamps: false
    })
  }
}
