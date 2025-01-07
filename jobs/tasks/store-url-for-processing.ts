import { Match, UrlForProcessing } from '../../db/models'
import { AbstractTask } from "./abstract-task"

import { AbstractMatchesListResponse } from '../responses/abstract-matches-list-response'
import { UrlForProcessingStatus } from '../../enums/url-for-processing-status'

export class StoreUrlForProcessing extends AbstractTask {

  override async perform(context: TTaskContext): Promise<TTaskContext> {
    if (!context.sources) {
      return context.exit('StoreUrlForProcessing / не переданы источники')
    }

    if (!context.platform) {
      return context.exit('StoreUrlForProcessing / не передана платформа')
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

        const queuedCount = await UrlForProcessing.count({
          where: {
            url,
            platformId: context.platform
          }
        })

        if (queuedCount > 0) {
          continue
        }

        const matchesWithUrlCount = await Match.count({
          where: {
            url,
            platformId: context.platform
          }
        })

        if (matchesWithUrlCount > 0) {
          continue
        }
  
        await UrlForProcessing.create({
          url,
          status: UrlForProcessingStatus.Waitig,
          platformId: context.platform,
          tries: 0
        })
      }
    }

    return context
  }

}