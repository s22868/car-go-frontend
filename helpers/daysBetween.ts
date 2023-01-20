export default (date1: Date, date2: Date) => {
  const one_day = 1000 * 60 * 60 * 24

  const date1_ms = date1.getTime()
  const date2_ms = date2.getTime()

  const difference_ms = Math.abs(date2_ms - date1_ms)

  return Math.round(difference_ms / one_day)
}
