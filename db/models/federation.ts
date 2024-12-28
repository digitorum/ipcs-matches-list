import type { Optional } from 'sequelize'

import { DataTypes, Model, Sequelize } from 'sequelize'

type FederationAttributes = {
  id: number;
  name: string;
  fullName: string | null;
}

type FederationCreationAttributes = Optional<FederationAttributes, 'id'>

export class Federation extends Model<FederationAttributes, FederationCreationAttributes> {
  declare id: number;
  declare name: string;
  declare fullName: string | null;

  static associate(sequelize: Sequelize) {
    Federation.init({
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
      timestamps: false
    })
  }
}
