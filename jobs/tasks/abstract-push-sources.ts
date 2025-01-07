import type { Platform } from "../../enums/platform"

import { AbstractTask } from "./abstract-task"

export abstract class AbstractPushSources extends AbstractTask {
  protected abstract sources: ITaskContextSources[]

  protected abstract platform: Platform

  override async perform(context: TTaskContext): Promise<TTaskContext> {
    return {
      ...context,
      platform: this.platform,
      sources: this.sources
    }
  }
}
