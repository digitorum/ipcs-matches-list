import { AbstractTask } from "./abstract-task"

export abstract class AbstractFetch extends AbstractTask {

  protected abstract fetch(source: string): any

  override async perform(context: ITaskContext): Promise<ITaskContext> {
    if (!context.sources) {
      return context
    }

    const sources = await Promise.all(context.sources.map(async (source) => {
      return {
        ...source,
        response: await this.fetch(source.url)
      }
    }))

    return {
      ...context,
      sources
    }
  }

}