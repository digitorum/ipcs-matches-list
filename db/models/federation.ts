import type { Optional } from 'sequelize'

import { DataTypes, Sequelize } from 'sequelize'
import { AbstractModel } from './abstract';

type FederationAttributes = {
  id: number;
  name: string;
  fullName: string | null;
}

type FederationCreationAttributes = Optional<FederationAttributes, 'id'>

export class Federation extends AbstractModel<FederationAttributes, FederationCreationAttributes> {
  declare id: number;
  declare name: string;
  declare fullName: string | null;
}

export class FederationFabric {
  static init(sequelize: Sequelize) {
    return Federation.init({
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
      fullName: {
        allowNull: true,
        type: DataTypes.STRING
      }
    }, {
      sequelize,
      tableName: 'Federations',
      modelName: 'federation',
      timestamps: false
    })
  }
}