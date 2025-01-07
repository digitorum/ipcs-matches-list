import { AbstractMatchesListResponse } from "./abstract-matches-list-response";

export class AtlimaMatchesList extends AbstractMatchesListResponse {
  constructor(
    private json: {
      results?: {
        slug: string;
      }[]
    }
  ) {
    super()
  }

  public override get list(): string[] {
    return this.json
      .results
      ?.map(({ slug }) => `https://atlima.com/e/${slug}/about`) ?? []
  }

}