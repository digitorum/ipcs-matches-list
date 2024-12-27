import { AbstractTask } from "./abstract-task"

import { LinkPending } from '../db/models/link-pending'
import { LinkStatus } from "../enum/link-status"

export class MatchPageGetFirst extends AbstractTask {
  override async perform(context: ITaskContext): Promise<ITaskContext> {
    const task = await LinkPending.findOne({
      where: {
        status: LinkStatus.Waitig
      },
      order: [
        ['tries', 'ASC']
      ]
    })

    if (!task) {
      throw 'no task fetched'
    }

    await task.increment('tries')
    await task.update({ status: LinkStatus.InProgress })

    return {
      platform: task.get('platform') as string,
      sources: [
        {
          type: 'html',
          url: task.get('url') as string
        }
      ]
    }
  }
}