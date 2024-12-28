import type { Optional } from 'sequelize'

import { DataTypes, Model, Sequelize } from 'sequelize'

type DisciplineAttributes = {
  id: number;
  name: string;
}

type DisciplineCreationAttributes = Optional<DisciplineAttributes, 'id'>

export class Discipline extends Model<DisciplineAttributes, DisciplineCreationAttributes> {
  declare id: number;
  declare name: string;

  static associate(sequelize: Sequelize) {
    Discipline.init({
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
      timestamps: false
    })
  }
}
