import { DataTypes } from 'sequelize'

import { sequelize } from '../index'

export const Weapon = sequelize.define(
  'Weapon',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  }
)
