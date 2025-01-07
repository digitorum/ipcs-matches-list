import type { Optional } from 'sequelize'

import { DataTypes, Model, Sequelize } from 'sequelize'

type CityAttributes = {
  id: number;
  name: string;
  country: string | null;
}

type CityCreationAttributes = Optional<CityAttributes, 'id'>

export class City extends Model<CityAttributes, CityCreationAttributes> {
  declare id: number;
  declare name: string;
  declare country: string;

  static associate(sequelize: Sequelize) {
    City.init({
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
      timestamps: false
    })
  }
}
