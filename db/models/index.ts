import { CityFabric } from './city'
import { DisciplineFabric } from './discipline'
import { FederationFabric } from './federation'
import { LocationFabric } from './location'
import { MatchDisciplineFabric } from './match-discipline'
import { MatchModelFabric } from './match'
import { PlatformFabric } from './platform'
import { Model, Sequelize } from 'sequelize'
import { UrlForProcessingFabric } from './url-for-processing'

import * as configs from '../config/config.json'

const env = process.env.NODE_ENV || 'development'
const config = (configs as any)[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config)

const City = CityFabric.init(sequelize)
const Discipline = DisciplineFabric.init(sequelize)
const Federation = FederationFabric.init(sequelize)
const Location = LocationFabric.init(sequelize)
const Match = MatchModelFabric.init(sequelize)
const MatchDiscipline = MatchDisciplineFabric.init(sequelize)
const Platform = PlatformFabric.init(sequelize)
const UrlForProcessing = UrlForProcessingFabric.init(sequelize)

const models: Record<string, any> = {
  City,
  Match,
  Discipline,
  Federation,
  Location,
  MatchDiscipline,
  Platform,
  UrlForProcessing
}

Object.keys(models).forEach(function(key) {
  if (models[key].associate) {
    models[key].associate(models)
  }
})



export {
  City,
  Match,
  Discipline,
  Federation,
  Location,
  MatchDiscipline,
  Platform,
  UrlForProcessing
}