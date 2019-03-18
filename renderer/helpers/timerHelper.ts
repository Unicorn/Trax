import { Timer } from 'models/Timer'

export const timerDuration = (timer: Timer, format?: boolean) => {
  const { entries } = timer
  let duration = entries && entries.length > 0 ? entries.reduce((prev: any, curr: any) => prev + curr.duration, 0) : timer.duration

  return format ? timerClock(duration, true) : duration
}

export const timersDuration = (timers: Timer[], format?: boolean) => {
  let duration = timers.reduce((prev: any, curr: any) => prev + timerDuration(curr), 0)

  return format ? timerClock(duration, true) : duration
}

export const timerClock = (duration: number, hideEmpty?: boolean) => {
  let hours = ('0' + Math.floor(duration / (60 * 60)).toString()).slice(-2)
  let minutes_divisor = duration % (60 * 60)
  let minutes = ('0' + Math.floor(minutes_divisor / 60).toString()).slice(-2)
  let seconds_devisor = minutes_divisor % 60
  let seconds = ('0' + Math.ceil(seconds_devisor).toString()).slice(-2)
  let formatted = `${hours}:${minutes}:${seconds}`

  return duration > 0 ? formatted : hideEmpty ? '' : '00:00:00'
}
