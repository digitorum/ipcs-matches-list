interface ILogger {
  log(entity: string, message: string): void;
  free(): void;
}

namespace Task {

  type TContext = {
    exit: Function;
  } & Partial<{
    
    platform: number;
    sources: IContextSources[];
  }>
  
  interface IContextSources {
    baseurl?: string;
    links?: string[];
    response?: any;
    url: string;
  }
}

namespace Site {

  namespace Api {

    interface IMatchesListResponse {
      matches: {
        name: string;
        url: string;
        startDate: string;
        endDate: string | null;
        level: number;
        exercisesCount: number;
        minimumShots: number;
        price: string;
        federation: {
          name: string;
        } | null;
        location: {
          description: string;
          city: {
            name: string;
          } | null;
        };
        platform: {
          name: string;
        }
      }[]
    }

  }

}