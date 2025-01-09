import type { Optional } from 'sequelize'

import { DataTypes, Sequelize } from 'sequelize'
import { AbstractModel } from './abstract';

type PlatformAttributes = {
  id: number;
  name: string;
  url: string;
}

type PlatformCreationAttributes = Optional<PlatformAttributes, 'id'>

export class Platform extends AbstractModel<PlatformAttributes, PlatformCreationAttributes> {
  declare id: number;
  declare name: string;
  declare url: string;
}

export class PlatformFabric {
  static init(sequelize: Sequelize) {
    return Platform.init({
      id: {
        allowNull: false,
        autoIncrement: true,
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
      modelName: 'platform',
      timestamps: false
    })
  }
}
