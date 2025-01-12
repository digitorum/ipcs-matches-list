const events = ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM']

export function freeResources(actions: (eventType: string) => void) {
  events.forEach((eventType) => {
    process.on(eventType, actions.bind(null, eventType))
  })
}