type TTaskContext = {
  exit: Function;
} & Partial<{
  
  platform: number;
  sources: ITaskContextSources[];
}>

interface ITaskContextSources {
  baseurl?: string;
  links?: string[];
  response?: any;
  url: string;
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
          location: string;
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