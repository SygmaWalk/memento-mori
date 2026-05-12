export const WEEKS_PER_YEAR = 52
export const LIFE_EXPECTANCY_YEARS = 80
export const TOTAL_WEEKS = LIFE_EXPECTANCY_YEARS * WEEKS_PER_YEAR

export function getWeeksLived(birthDate) {
  const birth = new Date(birthDate)
  const now = new Date()
  const diffMs = now - birth
  const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7))
  return Math.min(diffWeeks, TOTAL_WEEKS)
}

export function getCurrentWeekIndex(birthDate) {
  return getWeeksLived(birthDate)
}

export function getLifePercentage(birthDate) {
  const lived = getWeeksLived(birthDate)
  return ((lived / TOTAL_WEEKS) * 100).toFixed(1)
}

export function getWeekData(birthDate, weekIndex) {
  const birth = new Date(birthDate)
  const weekStart = new Date(birth.getTime() + weekIndex * 7 * 24 * 60 * 60 * 1000)
  const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000)
  const year = Math.floor(weekIndex / WEEKS_PER_YEAR)

  return {
    index: weekIndex,
    year,
    weekOfYear: weekIndex % WEEKS_PER_YEAR,
    weekStart,
    weekEnd,
  }
}