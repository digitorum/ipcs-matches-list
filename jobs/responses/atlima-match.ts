import { AbstractMatchResponse } from './abstract-match-response';

type TAtlimaMatchResponse = {
  title?: string;
  start_event_date?: string;
  end_event_date?: string;
  evsk?: {
    IPSC_level_recommendation?: number;
  };
  exercises_amount?: number;
  minimum_shots?: number;
  price?: string;
  currency?: {
    code?: string;
  };
  city?: {
    title?: string;
  };
  region?: {
    title?: string;
    country?: {
      title?: string;
    };
  }
  properties?: {
    divisions?: {
      weapon?: {
        title?: string;
      }
      name_ru?: string;
    }[]
  };
  location: string;
}

export class AtlimaMatch extends AbstractMatchResponse {

  constructor(private json: TAtlimaMatchResponse) {
    super()
  }

  private getDate(str?: string): string | null {
    if (!str) {
      return null
    }

    const date = str.split('T')[0] ?? null
  
    if (!date) {
      return null
    }

    return `${date}T00:00:00Z`
  }
  
  override get name(): string {
    return this.json.title ?? ''
  }

  override get startDate(): string {
    return this.getDate(this.json.start_event_date) ?? ''
  }

  override get endDate(): string | null {
    return this.getDate(this.json.end_event_date)
  }

  override get level(): number {
    return this.json.evsk?.IPSC_level_recommendation ?? 0
  }

  override get federation(): string {
    return 'IPSC'
  }

  override get disciplines(): string[] {
    return this.json.properties?.divisions
      ?.map((div) => div.weapon?.title)
      .filter((chunk): chunk is string => !!chunk)
      .filter((chunk, index, arr) => arr.indexOf(chunk) === index) ?? []
  }

  override get location(): string {
    return [this.json.region?.country?.title, this.city, this.json.region?.title, this.json.location]
      .filter((chunk) => !!chunk)
      .join(', ')
  }

  override get exercisesCount(): string {
    if (!this.json.exercises_amount) {
      return ''
    }

    return this.json.exercises_amount.toString()
  }

  override get minimumShots(): number {
    return this.json.minimum_shots ?? 0
  }

  override get price(): string {
    return `${this.json.price ?? ''} ${this.json.currency?.code ?? ''}`.trim()
  }

  override get city(): string | null {
    return this.json.city?.title ?? null
  }

  override get country(): string | null {
    return this.json.region?.country?.title ?? null
  }

}
