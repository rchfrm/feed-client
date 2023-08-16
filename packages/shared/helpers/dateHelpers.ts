// Checks if two dates are the same day. If a second date isn't passed, it checks if the date is today
export function areSameDayUTC(date1: Date, date2: Date = new Date()): boolean {
  return date1.getUTCFullYear() === date2.getUTCFullYear()
    && date1.getUTCMonth() === date2.getUTCMonth()
    && date1.getUTCDate() === date2.getUTCDate()
}
