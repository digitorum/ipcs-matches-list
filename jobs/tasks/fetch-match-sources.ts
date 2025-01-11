import { AbstractTask } from './abstract-task'
import { AtlimaFetchMatch } from './atlima-fetch-match'
import { MakereadyFetchMatch } from './makeready-fetch-match'
import { MatchdayFetchMatch } from './matchday-fetch-match'
import { Platform } from '../../enums/platform'

export class FetchMatchSources extends AbstractTask {

  override async perform(context:Task.TContext): Promise<Task.TContext> {

    if (!context.sources) {
      await this.logger.log('FetchMatchSources', 'Не переданы источники')
      return context.exit()
    }

    if (!context.platform) {
      await this.logger.log('FetchMatchSources', 'Не передана платформа')
      return context.exit()
    }

    switch(context.platform) {
      case Platform.Atlima:
        return await new AtlimaFetchMatch(this.logger).perform(context)
      case Platform.Makeready:
        return await new MakereadyFetchMatch(this.logger).perform(context)
      case Platform.Matchday:
        return await new MatchdayFetchMatch(this.logger).perform(context)
      default:
        await this.logger.log('FetchMatchSources', `Обработчик для платформы "${context.platform}" не определен`)
        return context.exit()
    }
  }
}
