import { Logger } from '../../common/logger'

export class JobLogger extends Logger {
  protected override prefix: string = 'job'
}