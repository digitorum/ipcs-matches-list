import type { Optional } from 'sequelize'

import { Model, Sequelize, DataTypes } from 'sequelize'

type LocationAttributes = {
  id: number;
  location: string;
  cityId: number | null;
}

type LocationCreationAttributes = Optional<LocationAttributes, 'id'>

export class Location extends Model<LocationAttributes, LocationCreationAttributes> {
  declare id: number;
  declare location: string;
  declare cityId: number | null;

  static associate(sequelize: Sequelize) {
    Location.init({
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
      timestamps: false
    })
  }
}
