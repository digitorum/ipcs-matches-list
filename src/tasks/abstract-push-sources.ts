import type { Platform } from "../enum/platform"

import { AbstractTask } from "./abstract-task"

export abstract class AbstractPushSources extends AbstractTask {
  protected abstract sources: ITaskContextSources[]

  protected abstract platform: Platform

  override async perform(context: ITaskContext): Promise<ITaskContext> {
    return {
      ...context,
      platform: this.platform,
      sources: this.sources
    }
  }
}
