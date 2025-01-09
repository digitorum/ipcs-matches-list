import { AbstractTask } from "./abstract-task"

import { prisma } from '../../db'
import { UrlForProcessingStatus } from "../../enums/url-for-processing-status"

export class UrlForProcessingMarkUndone extends AbstractTask {
  override async perform(context:Task.TContext): Promise<Task.TContext> {
    if (!context.sources) {
      return context.exit()
    }

    for(let i = 0; i < context.sources.length; ++i) {
      const url = await prisma.urlForProcessing.findFirst({
        where: {
          url: context.sources[i]?.url ?? ''
        }
      })

      if (url) {
        await prisma.urlForProcessing.update({
          where: {
            id: url.id
          },
          data: {
            status: UrlForProcessingStatus.Waitig
          }
        })
      }
    }

    return context
  }
}
