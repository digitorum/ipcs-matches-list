import { Address, UrlForProcessing, Match, Federation, Discipline, Platform, MatchDiscipline } from '../../db/models'
import { AbstractTask } from "./abstract-task"
import { UrlForProcessingStatus } from "../enum/url-for-processing-status"

export class StoreMatch extends AbstractTask {

  override async perform(context: ITaskContext): Promise<ITaskContext> {

    if (!context.sources) {
      return context
    }

    if (!context.platform) {
      return context
    }

    for(let i = 0; i < context.sources.length; i++) {
      const source = context.sources[i]

      if (!source) {
        continue
      }

      const url = await UrlForProcessing.findOne({
        where: {
          url: source.url
        }
      })

      if (!url) {
        continue
      }

      const match = source.match

      if (!match) {
        await url.update({ status: UrlForProcessingStatus.Failed })
        continue
      }

      const [ federation ] = await Federation.findOrCreate({
        where: {
          name: match.federation
        }
      })

      const [ address ] = await Address.findOrCreate({
        where: {
          address: match.address ?? 'unknown'
        }
      })

      const createdMatch = await Match.create({
        name: match.name,
        url: url.url,
        platformId: context.platform,
        federationId: federation.id ?? null,
        startDate: match.startDate,
        endDate: match.endDate,
        level: match.level,
        exercisesCount: match.exercisesCount,
        minimumShots: match.minimumShots,
        price: match.price,
        addressId: address.id
      })

      match.disciplines.forEach(async function(name) {
        const [ discipline ] = await Discipline.findOrCreate({
          where: {
            name
          }
        })

        if (!discipline.id) {
          return
        }

        await MatchDiscipline.create({
          matchId: createdMatch.id,
          disciplineId: discipline.id
        })

      })

      await url.destroy()
    }

    return {}
  }

}