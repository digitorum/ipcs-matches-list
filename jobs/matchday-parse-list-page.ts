import { MatchdayFetchMatchesList } from './tasks/matchday-fetch-matches-list'
import { MatchdayPushMatchesListPage } from './tasks/matchday-push-matches-list-page'
import { StoreUrlForProcessing } from './tasks/store-url-for-processing'

export const tasks = [
  MatchdayPushMatchesListPage,
  MatchdayFetchMatchesList,
  StoreUrlForProcessing
]

export const schedule = '0 * * * *'
