import { AbstractMatchResponse } from '../responses/abstract-match-response'
import { AbstractTask } from "./abstract-task"
import { UrlForProcessingStatus } from "../../enums/url-for-processing-status"

import { prisma } from '../../db'

export class StoreMatch extends AbstractTask {

  override async perform(context:Task.TContext): Promise<Task.TContext> {

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

      const url = await prisma.urlForProcessing.findFirst({
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
        await prisma.urlForProcessing.update({
          where: {
            id: url.id
          },
          data: {
            status: UrlForProcessingStatus.Failed
          }
        })
        continue
      }

      let federationId = null

      if (match.federation) {
        const federation = await prisma.federation.upsert({
          where: {
            name: match.federation
          },
          update: {},
          create: {
            name: match.federation
          }
        })

        federationId = federation?.id ?? null
      }

      let cityId = null

      if (match.city) {
        const city = await prisma.city.upsert({
          where: {
            name: match.city
          },
          update: {},
          create: {
            name: match.city
          }
        })

        cityId = city?.id ?? null
      }
      
      const location = await prisma.location.upsert({
        where: {
          description: match.location ?? 'unknown',
          cityId
        },
        update: {},
        create: {
          description: match.location ?? 'unknown',
          cityId
        }
      })

      const createdMatch = await prisma.match.create({
        data: {
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
        }
      })

      for(let i = 0; i < match.disciplines.length; ++i) {
        const name = match.disciplines[i] ?? ''

        if (!name) {
          continue
        }

        const discipline = await prisma.discipline.upsert({
          where: {
            name
          },
          update: {},
          create: {
            name
          }
        })

        if (!discipline.id) {
          continue
        }

        await prisma.disciplinesOnMatch.create({
          data: {
            matchId: createdMatch.id,
            disciplineId: discipline.id
          }
        })
      }

      await prisma.urlForProcessing.delete({
        where: {
          id: url.id
        }
      })
    }

    return context
  }

}