export abstract class AbstractMatchResponse {

  abstract get name(): string
  abstract get startDate(): string
  abstract get endDate(): string | null
  abstract get level(): number
  abstract get federation(): string
  abstract get disciplines(): string[]
  abstract get location(): string
  abstract get exercisesCount(): number
  abstract get minimumShots(): number
  abstract get price(): string
  abstract get city(): string | null

  protected getDateTimeFromSrcDate(str: string) {
    if (!str) {
      return ''
    }

    const date = str.trim().split('.').reverse().join('-')

    return `${date}T00:00:00Z`
  }

}