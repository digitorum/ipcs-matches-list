import type { Optional } from 'sequelize'

import { Model } from 'sequelize'

type FederationAttributes = {
  id: number;
  name: string;
  fullName: string | null;
}

type FederationCreationAttributes = Optional<FederationAttributes, 'id'>

export class Federation extends Model<FederationAttributes, FederationCreationAttributes> {
  declare id: number;
  declare name: string;
  declare fullName: string | null;
}
