import { AbstractTask } from './abstract-task'
import { UrlForProcessingStatus } from '../../enums/url-for-processing-status'

import { prisma } from '../../db'

export class UrlForProcessingShift extends AbstractTask {
  override async perform(context:Task.TContext): Promise<Task.TContext> {

    const url = await prisma.urlForProcessing.findFirst({
      where: {
        status: UrlForProcessingStatus.Waitig
      },
      orderBy: {
        tries: 'asc'
      }
    })

    if (!url) {
      return context.exit()
    }

    await prisma.urlForProcessing.update({
      where: {
        id: url.id
      },
      data: {
        status: UrlForProcessingStatus.InProgress,
        tries: url.tries + 1
      }
    })

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
