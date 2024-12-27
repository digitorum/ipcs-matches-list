import { FetchSources } from "../tasks/fetch-sources"
import { MakereadyParseMatchesListPage } from "../tasks/makeready-parse-matches-list-page"
import { MakereadyPushMatchesListPage } from "../tasks/makeready-push-matches-list-page"
import { StoreMatchPages } from '../tasks/store-match-pages'

export default [
  MakereadyPushMatchesListPage,
  FetchSources,
  MakereadyParseMatchesListPage,
  StoreMatchPages
]
