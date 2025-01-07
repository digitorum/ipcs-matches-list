import { FetchSources } from "../tasks/fetch-sources"
import { Job } from "./job"
import { MakereadyParseMatchesListPage } from "../tasks/makeready-parse-matches-list-page"
import { MakereadyPushMatchesListPage } from "../tasks/makeready-push-matches-list-page"
import { StoreUrlForProcessing } from '../tasks/store-url-for-processing'

export const job = new Job()
  .try([
    MakereadyPushMatchesListPage,
    FetchSources,
    MakereadyParseMatchesListPage,
    StoreUrlForProcessing
  ])
