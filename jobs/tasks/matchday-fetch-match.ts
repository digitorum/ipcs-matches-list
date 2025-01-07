import { FetchHtml } from "./fetch-html"
import { MatchdayMatch } from "../responses/matchday-match"

export class MatchdayFetchMatch extends FetchHtml {
  override async perform(context: TTaskContext): Promise<TTaskContext> {

    if (!context.sources) {
      return context.exit('MatchdayFetchMatch / не переданы источники')
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