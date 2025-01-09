import { Location, UrlForProcessing, Match, Federation, Discipline, MatchDiscipline, City } from '../../db/models'
import { AbstractMatchResponse } from '../responses/abstract-match-response'
import { AbstractTask } from "./abstract-task"
import { UrlForProcessingStatus } from "../../enums/url-for-processing-status"

export class StoreMatch extends AbstractTask {

  override async perform(context: TTaskContext): Promise<TTaskContext> {

    if (!context.sources) {
      return context.exit('StoreMatch / не переданы источники')
    }

    if (!context.platform) {
      return context.exit('StoreMatch / не передана платформа')
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

      const match = source.response

      if (!(match instanceof AbstractMatchResponse)) {
        continue
      }

      if (!match || !match.name || !match.startDate) {
        await url.update({ status: UrlForProcessingStatus.Failed })
        continue
      }

      let federationId = null

      if (match.federation) {
        const [ federation ] = await Federation.findOrCreate({
          where: {
            name: match.federation
          }
        })

        federationId = federation?.id ?? null
      }

      let cityId = null

      if (match.city) {
        const [ city ] = await City.findOrCreate({
          where: {
            name: match.city
          }
        })

        cityId = city?.id ?? null
      }
      
      const [ location ] = await Location.findOrCreate({
        where: {
          location: match.location ?? 'unknown',
          cityId
        }
      })

      const createdMatch = await Match.create({
        name: match.name,
        url: url.url,
        platformId: context.platform,
        federationId,
        startDate: match.startDate,
        endDate: match.endDate,
        level: match.level,
        exercisesCount: match.exercisesCount,
        minimumShots: match.minimumShots,
        price: match.price,
        locationId: location.id
      })

      for(let i = 0; i < match.disciplines.length; ++i) {
        const name = match.disciplines[i]

        const [ discipline ] = await Discipline.findOrCreate({
          where: {
            name
          }
        })

        if (!discipline.id) {
          continue
        }

        await MatchDiscipline.create({
          matchId: createdMatch.id,
          disciplineId: discipline.id
        })
      }

      await url.destroy()
    }

    return context
  }

}