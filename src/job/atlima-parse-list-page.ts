import { AtlimaParseMatchesListPages } from "../tasks/atlima-parse-matches-list-pages"
import { AtlimaPushMatchesListPages } from "../tasks/atlima-push-matches-list-pages"
import { FetchSources } from "../tasks/fetch-sources"
import { Job } from "./job"
import { StoreUrlForProcessing } from '../tasks/store-url-for-processing'

export const job = new Job()
  .try([
    AtlimaPushMatchesListPages,
    FetchSources,
    AtlimaParseMatchesListPages,
    StoreUrlForProcessing
  ])

