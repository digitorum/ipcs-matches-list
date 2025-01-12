import { Job } from './job'
import { Logger } from '../common/logger'
import { MatchdayFetchMatchesList } from './tasks/matchday-fetch-matches-list'
import { MatchdayPushMatchesListPage } from './tasks/matchday-push-matches-list-page'
import { StoreUrlForProcessing } from './tasks/store-url-for-processing'

export const job = new Job(
  new Logger()
)
  .schedule('0 * * * *')
  .try([
    MatchdayPushMatchesListPage,
    MatchdayFetchMatchesList,
    StoreUrlForProcessing
  ])
