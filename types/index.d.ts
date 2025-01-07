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
  type: 'html' | 'json';
  url: string;
  match?: {
    startDate: string;
    endDate: string | null;
    level: number;
    federation: string;
    name: string;
    exercisesCount: number;
    minimumShots: number;
    price: string;
    location: string;
    disciplines: string[];
    city?: string;
  }
}