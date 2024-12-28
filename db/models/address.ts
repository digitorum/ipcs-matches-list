import type { Optional } from 'sequelize'

import { Model } from 'sequelize'

type AddressAttributes = {
  id: number;
  address: string;
  country: string | null;
  city: string | null;
}

type AddressCreationAttributes = Optional<AddressAttributes, 'id'>

export class Discipline extends Model<AddressAttributes, AddressCreationAttributes> {
  declare id: number;
  declare address: string;
  declare country: string | null;
  declare city: string | null;
}
