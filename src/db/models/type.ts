import { DataTypes } from 'sequelize'

import { sequelize } from '../index'

export const Type = sequelize.define(
  'Type',
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
