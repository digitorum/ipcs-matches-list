import { FetchMatchSources } from './tasks/fetch-match-sources'
import { StoreMatch } from './tasks/store-match'
import { UrlForProcessingMarkUndone } from './tasks/url-for-processing-mark-undone'
import { UrlForProcessingShift } from './tasks/url-for-processing-shift'

export const tasks = [
  UrlForProcessingShift,
  FetchMatchSources,
  StoreMatch
]

export const failureTask = UrlForProcessingMarkUndone

export const schedule = '*/1 * * * *'
