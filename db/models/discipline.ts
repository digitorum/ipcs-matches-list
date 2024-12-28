import type { Optional } from 'sequelize'

import { Model } from 'sequelize'

type DisciplineAttributes = {
  id: number;
  name: string;
}

type DisciplineCreationAttributes = Optional<DisciplineAttributes, 'id'>

export class Discipline extends Model<DisciplineAttributes, DisciplineCreationAttributes> {
  declare id: number;
  declare name: string;
}
