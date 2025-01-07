import { AtlimaFetchMatchesListPages } from "./tasks/atlima-fetch-matches-list-pages"
import { AtlimaPushMatchesListPages } from "./tasks/atlima-push-matches-list-pages"
import { Job } from "./job"
import { StoreUrlForProcessing } from './tasks/store-url-for-processing'

export const job = new Job()
  .try([
    AtlimaPushMatchesListPages,
    AtlimaFetchMatchesListPages,
    StoreUrlForProcessing
  ])

