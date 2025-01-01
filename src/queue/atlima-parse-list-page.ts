import { AtlimaParseMatchesListPages } from "../tasks/atlima-parse-matches-list-pages"
import { AtlimaPushMatchesListPages } from "../tasks/atlima-push-matches-list-pages"
import { FetchSources } from "../tasks/fetch-sources"
import { StoreUrlForProcessing } from '../tasks/store-url-for-processing'

export default [
  AtlimaPushMatchesListPages,
  FetchSources,
  AtlimaParseMatchesListPages,
  StoreUrlForProcessing
]
