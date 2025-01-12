import { Job } from './job'
import { Logger } from '../common/logger'
import { MakereadyFetchMatchesList } from './tasks/makeready-fetch-matches-list'
import { MakereadyPushMatchesListPage } from './tasks/makeready-push-matches-list-page'
import { StoreUrlForProcessing } from './tasks/store-url-for-processing'

export const job = new Job(
  new Logger()
)
  .schedule('0 * * * *')
  .try([
    MakereadyPushMatchesListPage,
    MakereadyFetchMatchesList,
    StoreUrlForProcessing
  ])
