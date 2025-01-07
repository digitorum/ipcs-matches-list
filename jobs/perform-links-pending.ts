import { FetchMatchSources } from "./tasks/fetch-match-sources"
import { Job } from "./job"
import { StoreMatch } from './tasks/store-match'
import { UrlForProcessingMarkUndone } from "./tasks/url-for-processing-mark-undone"
import { UrlForProcessingPerform } from "./tasks/url-for-processing-perform"

export const job = new Job()
  .try([
    UrlForProcessingPerform,
    FetchMatchSources,
    StoreMatch
  ])
  .catch(UrlForProcessingMarkUndone)