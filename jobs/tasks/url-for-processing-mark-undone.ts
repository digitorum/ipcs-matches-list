import { AbstractTask } from "./abstract-task"

import { UrlForProcessing } from '../../db/models'
import { UrlForProcessingStatus } from "../../enums/url-for-processing-status"

export class UrlForProcessingMarkUndone extends AbstractTask {
  override async perform(context: TTaskContext): Promise<TTaskContext> {
    if (!context.sources) {
      return context.exit()
    }

    for(let i = 0; i < context.sources.length; ++i) {
      const url = await UrlForProcessing.findOne({
        where: {
          url: context.sources[i]?.url ?? ''
        }
      })

      if (url) {
        await url.update({ status: UrlForProcessingStatus.Waitig })
      }
    }

    return context
  }
}
