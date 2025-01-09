import type { ModelStatic, Optional } from 'sequelize'

import { DataTypes, Sequelize } from 'sequelize'
import { AbstractModel } from './abstract';

type CityAttributes = {
  id: number;
  name: string;
  country: string | null;
}

type CityCreationAttributes = Optional<CityAttributes, 'id'>

export class City extends AbstractModel<CityAttributes, CityCreationAttributes> {
  declare id: number;
  declare name: string;
  declare country: string;
}

export class CityFabric {
  static init(sequelize: Sequelize) {
    return City.init({
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
      country: {
        allowNull: true,
        type: DataTypes.STRING
      }
    }, {
      sequelize,
      tableName: 'Cities',
      modelName: 'city',
      timestamps: false
    })
  }
}
