import { FetchMatchSources } from "../tasks/fetch-match-sources"
import { ParseMatchPage } from "../tasks/parse-match-page"
import { StoreMatch } from '../tasks/store-match'
import { UrlForProcessingPerform } from "../tasks/url-for-processing-perform"

export default [
  UrlForProcessingPerform,
  FetchMatchSources,
  ParseMatchPage,
  StoreMatch
]