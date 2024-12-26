import type { ILink } from './abstract-parse-html'

import { AbstractTask } from "./abstract-task"
import { LinkPending } from '../db/models/link-pending'

export class StoreLinksTask extends AbstractTask {

  override async perform(context: { links?: ILink[] }): Promise<{}> {
    await LinkPending.sync()

    if (!context.links) {
      throw 'links not passed'
    }

    for(let i = 0; i < context.links.length; i++) {
      const link = context.links[i]

      if (!link) {
        continue
      }

      const count = await LinkPending.count({
        where: {
          url: link.link,
          platform: link.platform
        }
      })

      if (count === 0) {
        await LinkPending.create({
          url: link.link,
          platform: link.platform
        })
      }
    }

    return {}
  }

}