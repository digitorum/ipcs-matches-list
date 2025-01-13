import * as atlimaParse from '../jobs/atlima-parse-list-page'
import * as linksParse from '../jobs/perform-links-pending'
import * as makereadyParse from '../jobs/makeready-parse-list-page'
import * as matchdayParse from '../jobs/matchday-parse-list-page'

import { CronJob } from 'cron'
import { Job } from '../jobs/job'
import { Process } from '../common/process'

const jobs: CronJob[] = [];

[
  atlimaParse,
  makereadyParse,
  matchdayParse,
  linksParse
].forEach((job) => {

  if (!job.schedule) {
    return
  }

  const instance = Job.create(job.tasks, 'failureTask' in job ? job.failureTask : null)

  jobs.push(new CronJob(
    job.schedule,
    async function() {
      await instance.perform()
    }
  ))

})

console.log(`Зарегистрировано джоб: ${jobs.length}...`)

jobs.forEach((job) => {
  job.start()
})

Process.executeOnExit(() => {
  jobs.forEach((job) => {
    job.stop()
  })
})
