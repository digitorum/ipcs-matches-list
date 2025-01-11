import { FetchHtml } from './fetch-html'
import { MatchdayMatchesList } from '../responses/matchday-matches-list'

export class MatchdayFetchMatchesList extends FetchHtml {
  override async perform(context:Task.TContext): Promise<Task.TContext> {

    if (!context.sources) {
      await this.logger.log('MatchdayFetchMatchesList', 'Не переданы источники')
      return context.exit()
    }

    return {
      ...context,
      sources: await Promise.all(context.sources.map(async (source) => {
        const baseurl = new URL(source.url).origin
  
        return {
          ...source,
          baseurl,
          response: new MatchdayMatchesList(await this.fetch(source.url), baseurl)
        }
      }))
    }
    
  }
}