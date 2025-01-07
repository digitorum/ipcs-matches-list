import { AbstractTask } from './abstract-task'
import { MakereadyParseMatchPage } from './makeready-parse-match-page'
import { Platform } from '../enum/platform'
import { AtlimaParseMatchPage } from './atlima-parse-match-page'
import { MatchdayParseMatchPage } from './matchday-parse-match-page'

export class ParseMatchPage extends AbstractTask {
  override async perform(context: TTaskContext): Promise<TTaskContext> {
    switch(context.platform) {
      case Platform.Makeready:
        return await new MakereadyParseMatchPage().perform(context)
      case Platform.Atlima:
        return await new AtlimaParseMatchPage().perform(context)
      case Platform.Matchday:
        return await new MatchdayParseMatchPage().perform(context)
      default:
        return context
    }
  }
}