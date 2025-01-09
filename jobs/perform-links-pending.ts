import { FetchMatchSources } from "./tasks/fetch-match-sources"
import { Job } from "./job"
import { StoreMatch } from './tasks/store-match'
import { UrlForProcessingMarkUndone } from "./tasks/url-for-processing-mark-undone"
import { UrlForProcessingShift } from "./tasks/url-for-processing-shift"

export const job = new Job()
  .try([
    UrlForProcessingShift,
    FetchMatchSources,
    StoreMatch
  ])
  .catch(UrlForProcessingMarkUndone)