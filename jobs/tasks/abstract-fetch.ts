import { AbstractTask } from './abstract-task'

export abstract class AbstractFetch extends AbstractTask {

  protected abstract fetch(source: string): any

  override async perform(context:Task.TContext): Promise<Task.TContext> {
    if (!context.sources) {
      await this.logger.log('AbstractFetch', 'Не переданы источники')
      return context.exit()
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