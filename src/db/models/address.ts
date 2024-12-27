import { DataTypes } from 'sequelize'

import { sequelize } from '../index'

export const Address = sequelize.define(
  'Address',
  {
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['address']
      }
    ]
  }
)
