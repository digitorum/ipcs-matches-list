import type { Optional } from 'sequelize'

import { DataTypes, Model, Sequelize } from 'sequelize'

type PlatformAttributes = {
  id: number;
  name: string;
  url: string;
}

type PlatformCreationAttributes = Optional<PlatformAttributes, 'id'>

export class Platform extends Model<PlatformAttributes, PlatformCreationAttributes> {

  tableName = ''

  declare id: number;
  declare name: string;
  declare url: string;

  static associate(sequelize: Sequelize) {
    Platform.init({
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING
      }
    }, {
      sequelize,
      tableName: 'Platforms',
      timestamps: false
    })
  }
}
