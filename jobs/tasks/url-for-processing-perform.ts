import { AbstractTask } from "./abstract-task"

import { UrlForProcessing } from '../../db/models'
import { UrlForProcessingStatus } from "../../enums/url-for-processing-status"

export class UrlForProcessingPerform extends AbstractTask {
  override async perform(context: TTaskContext): Promise<TTaskContext> {
    const url = await UrlForProcessing.findOne({
      where: {
        status: UrlForProcessingStatus.Waitig
      },
      order: [
        ['tries', 'ASC']
      ]
    })

    if (!url) {
      return context.exit('очередь пуста')
    }

    await url.increment('tries')
    await url.update({ status: UrlForProcessingStatus.InProgress })

    return {
      ...context,
      platform: url.platformId,
      sources: [
        {
          url: url.url
        }
      ]
    }
  }
}
