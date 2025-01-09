import type { ModelStatic, Optional } from 'sequelize'

import { Sequelize, DataTypes } from 'sequelize'
import { AbstractModel } from './abstract';

type LocationAttributes = {
  id: number;
  location: string;
  cityId: number | null;
}

type LocationCreationAttributes = Optional<LocationAttributes, 'id'>

export class Location extends AbstractModel<LocationAttributes, LocationCreationAttributes> {
  declare id: number;
  declare location: string;
  declare cityId: number | null;

  static override associate({ Location, Match, City }: Record<string, ModelStatic<any>>): void {
    if (!Location) {
      return
    }

    if (City) {
      Location.belongsTo(City)
    }

    if (Match) {
      Location.hasMany(Match)
    }
  }
}

export class LocationFabric {
  static init(sequelize: Sequelize) {
    return Location.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING
      },
      cityId: {
        allowNull: true,
        type: DataTypes.INTEGER
      }
    }, {
      sequelize,
      tableName: 'Locations',
      modelName: 'location',
      timestamps: false
    })
  }
}
