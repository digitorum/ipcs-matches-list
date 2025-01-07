import { FetchHtml } from "./fetch-html"
import { MakereadyMatch } from "../responses/makeready-match"

export class MakereadyFetchMatch extends FetchHtml {
  override async perform(context: TTaskContext): Promise<TTaskContext> {

    if (!context.sources) {
      return context.exit('MakereadyFetchMatch / не переданы источники')
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