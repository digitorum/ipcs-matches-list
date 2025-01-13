export class Process {
  static exitEvetns = [
    'SIGBREAK',           // Ctrl-Break on Windows
    'SIGHUP',             // Parent terminal closed
    'exit',
    'SIGINT',             // Terminal interrupt, usually by Ctrl-C
    'SIGUSR1',
    'SIGUSR2',            // Used by Nodemon
    'uncaughtException',
    'SIGTERM'             // Graceful termination
  ]

  /**
   * todo: разобраться с асинхронностью перед смертью процесса
   * @param actions 
   */
  static executeOnExit(actions: (eventType: string) => Promise<void> | void) {
    this.exitEvetns.forEach((eventType) => {
      process.on(eventType, actions.bind(null, eventType))
    })
  }

}
