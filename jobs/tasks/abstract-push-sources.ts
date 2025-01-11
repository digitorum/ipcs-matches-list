import type { Platform } from '../../enums/platform'

import { AbstractTask } from './abstract-task'

export abstract class AbstractPushSources extends AbstractTask {
  protected abstract sources: Task.IContextSources[]

  protected abstract platform: Platform

  override async perform(context:Task.TContext): Promise<Task.TContext> {
    return {
      ...context,
      platform: this.platform,
      sources: this.sources
    }
  }
}
