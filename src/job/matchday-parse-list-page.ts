import { FetchSources } from "../tasks/fetch-sources"
import { Job } from "./job"
import { MatchdayParseMatchesListPage } from "../tasks/matchday-parse-matches-list-page"
import { MatchdayPushMatchesListPage } from "../tasks/matchday-push-matches-list-page"
import { StoreUrlForProcessing } from '../tasks/store-url-for-processing'

export const job = new Job()
  .try([
    MatchdayPushMatchesListPage,
    FetchSources,
    MatchdayParseMatchesListPage,
    StoreUrlForProcessing
  ])
