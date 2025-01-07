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