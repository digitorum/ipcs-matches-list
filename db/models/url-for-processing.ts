import type { CreationOptional, Optional } from 'sequelize'

import { DataTypes, Sequelize } from 'sequelize'

import { UrlForProcessingStatus } from '../../enums/url-for-processing-status'
import { AbstractModel } from './abstract'

type UrlForProcessingAttributes = {
  id: number;
  url: string;
  platformId: number;
  status: UrlForProcessingStatus;
  tries: number;
  createdAt?: number;
  updatedAt?: number;
}

type UrlForProcessingCreationAttributes = Optional<UrlForProcessingAttributes, 'id'>

export class UrlForProcessing extends AbstractModel<UrlForProcessingAttributes, UrlForProcessingCreationAttributes> {
  declare id: number;
  declare url: string;
  declare platformId: number;
  declare status: UrlForProcessingStatus;
  declare tries: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export class UrlForProcessingFabric {
  static init(sequelize: Sequelize) {
    return UrlForProcessing.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING
      },
      platformId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Platforms'
          },
          key: 'id'
        },
        allowNull: false,
      },
      status: {
        allowNull: false,
        type: DataTypes.NUMBER
      },
      tries: {
        type: DataTypes.NUMBER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: 'UrlsForProcessing',
      modelName: 'urlForProcessing'
    })
  }
}