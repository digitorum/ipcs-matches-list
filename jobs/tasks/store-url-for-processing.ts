import { AbstractMatchesListResponse } from '../responses/abstract-matches-list-response'
import { AbstractTask } from './abstract-task'
import { UrlForProcessingStatus } from '../../enums/url-for-processing-status'

import { prisma } from '../../db'

export class StoreUrlForProcessing extends AbstractTask {

  override async perform(context:Task.TContext): Promise<Task.TContext> {
    if (!context.sources) {
      await this.logger.log('StoreUrlForProcessing', 'Не переданы источники')
      return context.exit()
    }

    if (!context.platform) {
      await this.logger.log('StoreUrlForProcessing', 'Не передана платформа')
      return context.exit()
    }

    for(let i = 0; i < context.sources.length; i++) {
      const response = context.sources[i]?.response

      if (!response) {
        continue
      }

      if (!(response instanceof AbstractMatchesListResponse)) {
        continue
      }

      const links = response.list

      for(let j = 0; j < links.length; j++) {
        const url = links[j]

        if (!url) {
          continue
        }

        const queuedCount = await prisma.urlForProcessing.count({
          where: {
            url,
            platformId: context.platform
          }
        })

        if (queuedCount > 0) {
          continue
        }

        const matchesWithUrlCount = await prisma.match.count({
          where: {
            url,
            platformId: context.platform
          }
        })

        if (matchesWithUrlCount > 0) {
          continue
        }
  
        await prisma.urlForProcessing.create({
          data: {
            url,
            status: UrlForProcessingStatus.Waitig,
            platformId: context.platform,
            tries: 0
          }
        })

        await this.logger.log('StoreUrlForProcessing', `Событие добавлено в очередь: ${url}`)
      }
    }

    return context
  }

}