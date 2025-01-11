import { FetchHtml } from './fetch-html'
import { MakereadyMatchesList } from '../responses/makeready-matches-list'

export class MakereadyFetchMatchesList extends FetchHtml {
  override async perform(context:Task.TContext): Promise<Task.TContext> {

    if (!context.sources) {
      await this.logger.log('MakereadyFetchMatchesList', 'Не переданы источники')
      return context.exit()
    }

    return {
      ...context,
      sources: await Promise.all(context.sources.map(async (source) => {
        const baseurl = new URL(source.url).origin
  
        return {
          ...source,
          baseurl,
          response: new MakereadyMatchesList(await this.fetch(source.url), baseurl)
        }
      }))
    }
    
  }
}