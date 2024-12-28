interface ITaskContext extends Partial<{
  platform: number;
  sources: ITaskContextSources[];
}> {}

interface ITaskContextSources {
  baseurl?: string;
  links?: string[];
  response?: any;
  type: 'html' | 'json';
  url: string;
  match?: {
    startDate: string;
    endDate: string;
    level: number;
    federation: string;
    name: string;
    exercisesCount: number;
    minimumShots: number;
    price: string;
    address: string;
    disciplines: string[];
  }
}