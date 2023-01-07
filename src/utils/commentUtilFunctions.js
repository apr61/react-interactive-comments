const formatter = new Intl.RelativeTimeFormat(undefined, {numeric: 'auto'})
const DIVISONS = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' }
]

export function dateFormatterToAgo(date) {
    let duration = (date - new Date()) / 1000
    for (let i = 0; i < DIVISONS.length; i++) {
      const division = DIVISONS[i]
      if (Math.abs(duration) < division.amount) {
        return formatter.format(Math.round(duration), division.name)
      }
      duration /= division.amount
    }
}

export function calculateScore(score){
  let finalScore = 0;
  score.forEach(sc => {
    finalScore += sc.vote
  })
  return finalScore
}