import { DateTime } from 'luxon'

// Convert ISO date string to readable date format (e.g., January 1, 2021)
export function convertToReadableDateFormat(isoDateString: string) {
  const dateTime = DateTime.fromISO(isoDateString)
  return dateTime.toFormat('MMMM d, yyyy')
}

// Convert ISO date string to simple date format (e.g. 2021-01-01)
export function convertToSimpleDateFormat(isoDateString: string) {
  const dateTime = DateTime.fromISO(isoDateString)
  return dateTime.toFormat('yyyy-MM-dd')
}
