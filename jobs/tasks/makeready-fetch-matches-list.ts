import { MakereadyMatchesList } from "../responses/makeready-matches-list"
import { FetchHtml } from "./fetch-html"

export class MakereadyFetchMatchesList extends FetchHtml {
  override async perform(context: TTaskContext): Promise<TTaskContext> {

    if (!context.sources) {
      return context.exit('MakereadyFetchMatchesList / не переданы источники')
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