import { AbstractTask } from "./abstract-task";

function getDate(str?: string): string | null {
  if (!str) {
    return null
  }

  return str.split('T')[0] ?? null
}

export class AtlimaParseMatchPage extends AbstractTask {
  override async perform(context: ITaskContext): Promise<ITaskContext> {

    const sources = context.sources?.map(function(source) {
      if (!source.response) {
        return source
      }

      const json: {
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
        }
      } = source.response

      const name = json.title ?? ''
      const federation = 'IPSC'
      const level = json.evsk?.IPSC_level_recommendation ?? 0
      const exercisesCount = json.exercises_amount ?? 0
      const minimumShots = json.minimum_shots ?? 0
      const price = `${json.price ?? ''} ${json.currency?.code ?? ''}`.trim()
      const address = [json.region?.country?.title, json.city?.title, json.region?.title]
        .filter((chunk) => !!chunk)
        .join(', ')
      const disciplines = json.properties?.divisions
        ?.map((div) => div.weapon?.title)
        .filter((chunk): chunk is string => !!chunk)
        .filter((chunk, index, arr) => arr.indexOf(chunk) === index) ?? []

      const startDate = getDate(json.start_event_date) ?? ''
      const endDate = getDate(json.end_event_date)

      if (!name || !startDate) {
        return source
      }

      return {
        ...source,
        match: {
          startDate,
          endDate,
          level,
          federation,
          name,
          exercisesCount,
          minimumShots,
          price,
          address,
          disciplines
        }
      }
    })

    return {
      ...context,
      sources
    }
  }
}