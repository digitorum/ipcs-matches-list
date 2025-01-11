export class DateContainer {
  private date: Date
  
  constructor() {
    this.date = new Date()
  }

  get yearString(): string {
    return this.date
      .getFullYear()
      .toString()
  }

  get dayOfMonthString(): string {
    return this.date
      .getDate()
      .toString()
      .padStart(2, '0')
  }

  get monthNumberString(): string {
    return (this.date.getMonth() + 1)
      .toString()
      .padStart(2, '0')
  }

  get hoursString(): string {
    return this.date
      .getHours()
      .toString()
      .padStart(2, '0')
  }

  get minutesString(): string {
    return this.date
      .getMinutes()
      .toString()
      .padStart(2, '0')
  }

  get secondsString(): string {
    return this.date
      .getSeconds()
      .toString()
      .padStart(2, '0')
  }

  get dateString(): string {
    return `${this.yearString}-${this.monthNumberString}-${this.dayOfMonthString}`
  }

  get dateTimeString(): string {
    return `${this.yearString}-${this.monthNumberString}-${this.dayOfMonthString} ${this.hoursString}:${this.minutesString}:${this.secondsString}`
  }
}