import { AbstractTask } from "./abstract-task"
import { LinkPending } from '../db/models/link-pending'

export class StoreMatchPages extends AbstractTask {

  override async perform(context: ITaskContext): Promise<ITaskContext> {
    if (!context.sources) {
      throw ''
    }

    for(let i = 0; i < context.sources.length; i++) {
      const links = context.sources[i]?.links ?? []

      for(let j = 0; j < links.length; j++) {
        const url = links[j]

        if (!url) {
          continue
        }

        const count = await LinkPending.count({
          where: {
            url,
            platform: context.platform
          }
        })
  
        if (count === 0) {
          await LinkPending.create({
            url,
            platform: context.platform
          })
        }
      }
    }

    return {}
  }

}