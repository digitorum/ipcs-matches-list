import type { ModelStatic } from 'sequelize'

import { Model } from 'sequelize'

export abstract class AbstractModel<TModelAttributes extends {} = any, TCreationAttributes extends {} = TModelAttributes> extends Model<TModelAttributes, TCreationAttributes> {
  static associate(models: Record<string, ModelStatic<any>>) {}
}