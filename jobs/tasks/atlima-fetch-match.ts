import { AtlimaMatch } from "../responses/atlima-match"
import { FetchJson } from "./fetch-json"

export class AtlimaFetchMatch extends FetchJson {

  protected getPatchedResource(source: string): string {
    const matches = source.match(/\/e\/([^/]+)\//i)

    if (!matches) {
      return source
    }

    return `https://atlima.com/api/sports-events/${matches[1]}`
  }

  override async perform(context:Task.TContext): Promise<Task.TContext> {
  
      if (!context.sources) {
        return context.exit('AtlimaFetchMatch / не переданы источники')
      }
  
      return {
        ...context,
        sources: await Promise.all(context.sources.map(async (source) => {
          return {
            ...source,
            response: new AtlimaMatch(await this.fetch(this.getPatchedResource(source.url)))
          }
        }))
      } 
    }
}