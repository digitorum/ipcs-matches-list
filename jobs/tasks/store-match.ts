import { AbstractMatchResponse } from '../responses/abstract-match-response'
import { AbstractTask } from './abstract-task'
import { DumbLocationResolver } from '../../common/dumb-location-resolver'
import { UrlForProcessingStatus } from '../../enums/url-for-processing-status'

import { prisma } from '../../db'

export class StoreMatch extends AbstractTask {

  override async perform(context:Task.TContext): Promise<Task.TContext> {

    if (!context.sources) {
      await this.logger.log('StoreMatch', 'Не переданы источники')
      return context.exit()
    }

    if (!context.platform) {
      await this.logger.log('StoreMatch', 'Не передана платформа')
      return context.exit()
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

      const reslover = new DumbLocationResolver(match.location)
      const countryName = match.country ?? reslover.country
      const cityName = match.city ?? reslover.city

      let federationId = null
      let countryId = null
      let cityId = null

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

      if (countryName) {
        const country = await prisma.country.upsert({
          where: {
            name: countryName
          },
          update: {},
          create: {
            name: countryName
          }
        })

        countryId = country.id
      }

      if (cityName) {
        const city = await prisma.city.upsert({
          where: {
            name: cityName,
            countryId
          },
          update: {},
          create: {
            name: cityName,
            countryId
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

      await this.logger.log('StoreMatch', `Событие обработано: ${url.url}`)

      await prisma.urlForProcessing.delete({
        where: {
          id: url.id
        }
      })
    }

    return context
  }

}