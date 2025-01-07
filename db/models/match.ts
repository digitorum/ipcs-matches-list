
import type { CreationOptional, Optional } from 'sequelize'

import { Model, DataTypes, Sequelize } from 'sequelize'

type MatchAttributes = {
  id: number;
  name: string;
  url: string;
  platformId: number;
  federationId: number | null;
  startDate: string;
  endDate: string | null;
  level: number;
  exercisesCount: number;
  minimumShots: number;
  price: string;
  locationId: number;
  createdAt: number;
  updatedAt: number;
}

type MatchCreationAttributes = Optional<MatchAttributes, 'id' | 'createdAt' | 'updatedAt'>

export class Match extends Model<MatchAttributes, MatchCreationAttributes> {
  declare id: number;
  declare name: string;
  declare url: string;
  declare platformId: number;
  declare federationId: number | null;
  declare startDate: string;
  declare endDate: string | null;
  declare level: number;
  declare exercisesCount: number;
  declare minimumShots: number;
  declare price: string;
  declare locationId: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static associate(sequelize: Sequelize) {
    Match.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING
        
      },
      platformId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Platforms'
          },
          key: 'id'
        }
      },
      federationId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Federations'
          },
          key: 'id'
        }
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      level: {
        type: DataTypes.NUMBER,
        defaultValue: 0
      },
      exercisesCount: {
        type: DataTypes.NUMBER,
        defaultValue: 0
      },
      minimumShots: {
        type: DataTypes.NUMBER,
        defaultValue: 0
      },
      price: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      locationId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Locations'
          },
          key: 'id'
        }
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
      tableName: 'Matches'
    })
  }
}