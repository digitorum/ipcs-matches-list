import { AtlimaFetchMatchesListPages } from './tasks/atlima-fetch-matches-list-pages'
import { AtlimaPushMatchesListPages } from './tasks/atlima-push-matches-list-pages'
import { StoreUrlForProcessing } from './tasks/store-url-for-processing'

export const tasks = [
  AtlimaPushMatchesListPages,
  AtlimaFetchMatchesListPages,
  StoreUrlForProcessing
]

export const schedule = '*/30 * * * *'


