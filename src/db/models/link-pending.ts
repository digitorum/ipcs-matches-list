import { DataTypes } from 'sequelize'
import { Platform } from '../../enum/platform'
import { LinkStatus } from '../../enum/link-status'

import { sequelize } from '../index'

export const LinkPending = sequelize.define(
  'LinkPending',
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    platform: {
      type: DataTypes.ENUM(Platform.Makeready, Platform.Atlima, Platform.Matchday),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(LinkStatus.Waitig, LinkStatus.InProgress, LinkStatus.Failed),
      defaultValue: LinkStatus.Waitig
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['url', 'platform']
      }
    ]
  }
)