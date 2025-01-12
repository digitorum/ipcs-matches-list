import { FetchMatchSources } from './tasks/fetch-match-sources'
import { Job } from './job'
import { Logger } from '../common/logger'
import { StoreMatch } from './tasks/store-match'
import { UrlForProcessingMarkUndone } from './tasks/url-for-processing-mark-undone'
import { UrlForProcessingShift } from './tasks/url-for-processing-shift'

export const job = new Job(
  new Logger()
)
  .schedule('*/5 * * * *')
  .try([
    UrlForProcessingShift,
    FetchMatchSources,
    StoreMatch
  ])
  .catch(UrlForProcessingMarkUndone)