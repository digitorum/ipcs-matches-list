import { AbstractTask } from "./abstract-task"

import { UrlForProcessing } from '../../db/models'
import { UrlForProcessingStatus } from "../enum/url-for-processing-status"

export class UrlForProcessingPerform extends AbstractTask {
  override async perform(context: ITaskContext): Promise<ITaskContext> {
    const url = await UrlForProcessing.findOne({
      where: {
        status: UrlForProcessingStatus.Waitig
      },
      order: [
        ['tries', 'ASC']
      ]
    })

    if (!url) {
      return {
        platform: 0,
        sources: []
      }
    }

    await url.increment('tries')
    await url.update({ status: UrlForProcessingStatus.InProgress })

    return {
      platform: url.platformId,
      sources: [
        {
          type: 'html',
          url: url.url
        }
      ]
    }
  }
}
