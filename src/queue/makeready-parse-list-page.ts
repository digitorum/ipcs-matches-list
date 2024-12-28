import { FetchSources } from "../tasks/fetch-sources"
import { MakereadyParseMatchesListPage } from "../tasks/makeready-parse-matches-list-page"
import { MakereadyPushMatchesListPage } from "../tasks/makeready-push-matches-list-page"
import { StoreUrlForProcessing } from '../tasks/store-url-for-processing'

export default [
  MakereadyPushMatchesListPage,
  FetchSources,
  MakereadyParseMatchesListPage,
  StoreUrlForProcessing
]
