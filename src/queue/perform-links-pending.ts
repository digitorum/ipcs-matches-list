import { FetchSources } from "../tasks/fetch-sources"
import { MatchPageGetFirst } from "../tasks/match-page-get-first"
import { MakereadyParseMatchPage } from "../tasks/makeready-parse-match-page"
import { StoreMatch } from '../tasks/store-match'

export default [
  MatchPageGetFirst,
  FetchSources,
  MakereadyParseMatchPage,
  StoreMatch
]