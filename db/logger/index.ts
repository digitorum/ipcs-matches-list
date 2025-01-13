import { Logger } from '../../common/logger'

export class DbLogger extends Logger {
  protected override prefix: string = 'db'
}
