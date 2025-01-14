import { MakereadyFetchMatchesList } from './tasks/makeready-fetch-matches-list'
import { MakereadyPushMatchesListPage } from './tasks/makeready-push-matches-list-page'
import { StoreUrlForProcessing } from './tasks/store-url-for-processing'

export const tasks = [
  MakereadyPushMatchesListPage,
  MakereadyFetchMatchesList,
  StoreUrlForProcessing
]

export const schedule = '*/30 * * * *'
