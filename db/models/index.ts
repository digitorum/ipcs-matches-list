import { Address } from './address'
import { Discipline } from './discipline'
import { Federation } from './federation'
import { Match } from './match'
import { MatchDiscipline } from './match-discipline'
import { Platform } from './platform'
import { Sequelize } from 'sequelize'
import { UrlForProcessing } from './url-for-processing'

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config)

const models = [
  Address,
  Discipline,
  Federation,
  Match,
  MatchDiscipline,
  Platform,
  UrlForProcessing
]

models.forEach(function(model) {
  if (model.associate) {
    model.associate(sequelize)
  }
})

export {
  Address,
  Discipline,
  Federation,
  Match,
  MatchDiscipline,
  Platform,
  UrlForProcessing
}