import { AbstractHtmlMatchesListResponse } from "./abstract-html-matches-list-response";

export class MatchdayMatchesList extends AbstractHtmlMatchesListResponse {
  protected override selectors = [
    '.competitions-list > .competitions-item[href]'
  ]

  protected override ignore: string[] = []
}
