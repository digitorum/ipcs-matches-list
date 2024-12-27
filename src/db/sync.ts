import { LinkPending } from './models/link-pending'
import { Address } from './models/address'
import { Type } from './models/type'
import { Weapon } from './models/weapon'
import { Match } from './models/match'

LinkPending.sync({ alter: true })
Address.sync({ alter: true })
Type.sync({ alter: true })
Weapon.sync({ alter: true })
Match.sync({ alter: true })
