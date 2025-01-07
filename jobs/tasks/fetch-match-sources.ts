import { AbstractTask } from "./abstract-task"
import { AtlimaFetchMatch } from "./atlima-fetch-match"
import { MakereadyFetchMatch } from "./makeready-fetch-match"
import { MatchdayFetchMatch } from "./matchday-fetch-match"
import { Platform } from "../../enums/platform"

export class FetchMatchSources extends AbstractTask {

  override async perform(context: TTaskContext): Promise<TTaskContext> {

    if (!context.sources) {
      return context.exit('FetchMatchSources / не переданы источники')
    }

    if (!context.platform) {
      return context.exit('FetchMatchSources / не передана платформа')
    }

    switch(context.platform) {
      case Platform.Atlima:
        return await new AtlimaFetchMatch().perform(context)
      case Platform.Makeready:
        return await new MakereadyFetchMatch().perform(context)
      case Platform.Matchday:
        return await new MatchdayFetchMatch().perform(context)
      default:
        return context.exit('FetchMatchSources / обработчик для платформы не определен')
    }
  }
}
