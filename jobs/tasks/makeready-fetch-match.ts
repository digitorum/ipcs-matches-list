import { FetchHtml } from './fetch-html'
import { MakereadyMatch } from '../responses/makeready-match'

export class MakereadyFetchMatch extends FetchHtml {
  override async perform(context:Task.TContext): Promise<Task.TContext> {

    if (!context.sources) {
      await this.logger.log('MakereadyFetchMatch', 'Не переданы источники')
      return context.exit()
    }

    return {
      ...context,
      sources: await Promise.all(context.sources.map(async (source) => {
        return {
          ...source,
          response: new MakereadyMatch(await this.fetch(source.url))
        }
      }))
    } 
  }
}