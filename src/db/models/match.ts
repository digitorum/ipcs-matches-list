import { DataTypes } from 'sequelize'
import { Platform } from '../../enum/platform'
import { Address } from '../models/address'
import { Type } from '../models/type'
import { Weapon } from '../models/weapon'

import { sequelize } from '../index'

export const Match = sequelize.define(
  'Match',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    platform: {
      type: DataTypes.ENUM(Platform.Makeready, Platform.Atlima, Platform.Matchday),
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      references: {
        model: Type,
        key: 'id'
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    level: {
      type: DataTypes.NUMBER,
    },
    exercisesCount: {
      type: DataTypes.NUMBER
    },
    minimumShots: {
      type: DataTypes.NUMBER
    },
    price: {
      type: DataTypes.STRING
    },
    addressId: {
      type: DataTypes.INTEGER,
      references: {
        model: Address,
        key: 'id'
      }
    },
    weaponId: {
      type: DataTypes.INTEGER,
      references: {
        model: Weapon,
        key: 'id'
      }
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['url']
      }
    ]
  }
)
