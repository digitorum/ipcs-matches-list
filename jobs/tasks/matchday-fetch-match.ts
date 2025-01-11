import { FetchHtml } from './fetch-html'
import { MatchdayMatch } from '../responses/matchday-match'

export class MatchdayFetchMatch extends FetchHtml {
  override async perform(context:Task.TContext): Promise<Task.TContext> {

    if (!context.sources) {
      await this.logger.log('MatchdayFetchMatch', 'Не переданы источники')
      return context.exit()
    }

    return {
      ...context,
      sources: await Promise.all(context.sources.map(async (source) => {
        return {
          ...source,
          response: new MatchdayMatch(await this.fetch(source.url))
        }
      }))
    } 
  }
}