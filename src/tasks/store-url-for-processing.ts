import { AbstractTask } from "./abstract-task"
import { UrlForProcessing } from '../../db/models'

import { UrlForProcessingStatus } from '../enum/url-for-processing-status'

export class StoreUrlForProcessing extends AbstractTask {

  override async perform(context: ITaskContext): Promise<ITaskContext> {
    if (!context.sources) {
      return context
    }

    if (!context.platform) {
      return context
    }

    for(let i = 0; i < context.sources.length; i++) {
      const links = context.sources[i]?.links ?? []

      for(let j = 0; j < links.length; j++) {
        const url = links[j]

        if (!url) {
          continue
        }

        const count = await UrlForProcessing.count({
          where: {
            url,
            platformId: context.platform
          }
        })
  
        if (count === 0) {
          await UrlForProcessing.create({
            url,
            status: UrlForProcessingStatus.Waitig,
            platformId: context.platform,
            tries: 0
          })
        }
      }
    }

    return {}
  }

}