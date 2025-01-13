import fs from 'node:fs'
import path from 'node:path'

import { DateContainer } from './date-container';
import { Process } from './process';

export class Logger implements ILogger {

  private stream: fs.WriteStream | null = null

  protected prefix: string = 'log'

  constructor() {
    Process.executeOnExit(() => {
      this.free()
    })
  }

  private open(): fs.WriteStream {
    this.stream = fs.createWriteStream(
      path.resolve(process.cwd(), 'logs', `${this.prefix}-${new DateContainer().dateString}.txt`),
      { flags: 'a' }
    )

    return this.stream
  }

  public log(entity: string, message: string): Promise<void> {
    const stream = this.open()
    const text = `${new DateContainer().dateTimeString} - ${entity} - ${message}\n`

    return new Promise((resolve) => {
      stream.write(text, () => {
        resolve()
      })
    })
  }

  public free() {
    if (this.stream) {
      this.stream.end()
    }

    this.stream = null
  }

}