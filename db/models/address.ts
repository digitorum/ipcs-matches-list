import type { Optional } from 'sequelize'

import { Model, Sequelize, DataTypes } from 'sequelize'

type AddressAttributes = {
  id: number;
  address: string;
  country: string | null;
  city: string | null;
}

type AddressCreationAttributes = Optional<AddressAttributes, 'id'>

export class Address extends Model<AddressAttributes, AddressCreationAttributes> {
  declare id: number;
  declare address: string;
  declare country: string | null;
  declare city: string | null;

  static associate(sequelize: Sequelize) {
    Address.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING
      },
      country: {
        allowNull: true,
        type: DataTypes.STRING
      },
      city: {
        allowNull: true,
        type: DataTypes.STRING
      }
    }, {
      sequelize,
      tableName: 'Addresses',
      timestamps: false
    })
  }
}
