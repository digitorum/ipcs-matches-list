import { Platform } from "../enum/platform"
import { AtlimaFetchMatchJson } from "./atlima-fetch-match-json"
import { FetchSources } from "./fetch-sources"

export abstract class FetchMatchSources extends FetchSources {

  override async perform(context: Partial<ITaskContext>): Promise<Partial<ITaskContext>> {

    if (!context.sources) {
      return context
    }

    if (!context.platform) {
      return context
    }

    switch(context.platform) {
      case Platform.Atlima:
        return await new AtlimaFetchMatchJson().perform(context)
      default:
        return await super.perform(context)
    }
  }
}
