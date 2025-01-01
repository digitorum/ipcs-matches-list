import { AbstractTask } from './abstract-task'
import { MakereadyParseMatchPage } from './makeready-parse-match-page'
import { Platform } from '../enum/platform'
import { AtlimaParseMatchPage } from './atlima-parse-match-page'

export class ParseMatchPage extends AbstractTask {
  override async perform(context: ITaskContext): Promise<ITaskContext> {
    switch(context.platform) {
      case Platform.Makeready:
        return await new MakereadyParseMatchPage().perform(context)
      case Platform.Atlima:
        return await new AtlimaParseMatchPage().perform(context)
      default:
        return context
    }
  }
}