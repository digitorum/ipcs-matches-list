import { Platform } from "../enum/platform"
import { AtlimaFetchMatchJson } from "./atlima-fetch-match-json"
import { FetchSources } from "./fetch-sources"

export class FetchMatchSources extends FetchSources {

  override async perform(context: TTaskContext): Promise<TTaskContext> {

    if (!context.sources) {
      return context.exit('FetchMatchSources / не переданы источники')
    }

    if (!context.platform) {
      return context.exit('FetchMatchSources / не передана платформа')
    }

    switch(context.platform) {
      case Platform.Atlima:
        return await new AtlimaFetchMatchJson().perform(context)
      default:
        return await super.perform(context)
    }
  }
}
