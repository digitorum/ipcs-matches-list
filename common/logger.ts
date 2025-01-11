import fs from 'node:fs'
import path from 'node:path'

import { DateContainer } from './date-container';

export class Logger implements ILogger {

  private stream: fs.WriteStream;

  constructor() {
    this.stream = fs.createWriteStream(
      path.resolve(process.cwd(), 'logs', `log-${new DateContainer().dateString}.txt`),
      { flags: 'a' }
    )
  }

  public log (entity: string, message: string): Promise<void> {
    const text = `${new DateContainer().dateTimeString} - ${entity} - ${message}\n`

    return new Promise((resolve) => {
      this.stream.write(text, () => {
        resolve()
      })
    })
  }

  public free() {
    this.stream.end()
  }

}