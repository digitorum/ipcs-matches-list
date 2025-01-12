import { job as atlimaParse } from '../jobs/atlima-parse-list-page'
import { freeResources } from '../common/free-resources'
import { job as linksParse } from '../jobs/perform-links-pending'
import { job as makereadyParse } from '../jobs/makeready-parse-list-page'
import { job as matchdayParse } from '../jobs/matchday-parse-list-page'

import { CronJob } from 'cron'

const jobs: CronJob[] = [];

[
  atlimaParse,
  makereadyParse,
  matchdayParse,
  linksParse
].forEach((job) => {

  if (!job.cron) {
    return
  }

  jobs.push(new CronJob(
    job.cron,
    async function() {
      await job.perform()
    }
  ))

})

console.log(`Зарегистрировано джоб: ${jobs.length}...`)

jobs.forEach((job) => {
  job.start()
})

freeResources(() => {
  jobs.forEach((job) => {
    job.stop()
  })
})
