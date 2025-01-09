import { AtlimaMatchesList } from "../responses/atlima-matches-list";
import { FetchJson } from "./fetch-json";

export class AtlimaFetchMatchesListPages extends FetchJson {
  override async perform(context:Task.TContext): Promise<Task.TContext> {
    if (!context.sources) {
      return context.exit('AtlimaFetchMatchesListPages / не переданы источники')
    }

    return {
      ...context,
      sources: await Promise.all(context.sources.map(async (source) => {
        const baseurl = new URL(source.url).origin

        return {
          ...source,
          baseurl,
          response: new AtlimaMatchesList(await this.fetch(source.url))
        }
      }))
    }
  }
}
