import { AbstractTask } from "./abstract-task"
import { Address } from '../db/models/address'
import { LinkPending } from '../db/models/link-pending'
import { Match } from '../db/models/match'
import { Type } from '../db/models/type'
import { Weapon } from '../db/models/weapon'
import { LinkStatus } from "../enum/url-for-processing-status"

export class StoreMatch extends AbstractTask {

  override async perform(context: ITaskContext): Promise<ITaskContext> {

    if (!context.sources) {
      throw ''
    }

    for(let i = 0; i < context.sources.length; i++) {
      const source = context.sources[i]

      if (!source) {
        continue
      }

      const link = await LinkPending.findOne({
        where: {
          url: source.url
        }
      })

      if (!link) {
        continue
      }

      const match = source.match

      if (!match) {
        await link.update({ status: LinkStatus.Failed })
        continue
      }

      const [ type ] = await Type.findOrCreate({
        where: {
          name: match.type ?? 'unknown'
        }
      })

      const [ weapon ] = await Weapon.findOrCreate({
        where: {
          name: match.weapon ?? 'unknown'
        }
      })

      const [ address ] = await Address.findOrCreate({
        where: {
          address: match.address ?? 'unknown'
        }
      })

      await Match.create({
        name: match.name,
        url: link.get('url'),
        platform: context.platform,
        typeId: type.get('id'),
        startDate: match.startDate,
        endDate: match.endDate,
        level: match.level,
        exercisesCount: match.exercisesCount,
        minimumShots: match.minimumShots,
        price: match.price,
        addressId: address.get('id'),
        weaponId: weapon.get('id')
      })

      await link.destroy()

    }

    return {}
  }

}