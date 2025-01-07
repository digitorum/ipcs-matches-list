import { Job } from "./job"
import { MakereadyPushMatchesListPage } from "./tasks/makeready-push-matches-list-page"
import { StoreUrlForProcessing } from './tasks/store-url-for-processing'
import { MakereadyFetchMatchesList } from "./tasks/makeready-fetch-matches-list"

export const job = new Job()
  .try([
    MakereadyPushMatchesListPage,
    MakereadyFetchMatchesList,
    StoreUrlForProcessing
  ])
