import { Job } from "./job"
import { MatchdayFetchMatchesList } from "./tasks/matchday-fetch-matches-list"
import { MatchdayPushMatchesListPage } from "./tasks/matchday-push-matches-list-page"
import { StoreUrlForProcessing } from './tasks/store-url-for-processing'

export const job = new Job()
  .try([
    MatchdayPushMatchesListPage,
    MatchdayFetchMatchesList,
    StoreUrlForProcessing
  ])
