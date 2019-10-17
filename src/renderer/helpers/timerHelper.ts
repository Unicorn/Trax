import { Timer, TimerEntry } from '@/models/Timer'

export const timerClock = (duration: number, hideEmpty?: boolean): string => {
  const hours = ('0' + Math.floor(duration / (60 * 60)).toString()).slice(-2)
  const minutesDivisor = duration % (60 * 60)
  const minutes = ('0' + Math.floor(minutesDivisor / 60).toString()).slice(-2)
  const formatted = `${hours}:${minutes}`

  return duration > 0 ? formatted : hideEmpty ? '' : '00:00'
}

export const timerDuration = (timer: Timer, format?: boolean): number | string => {
  const { entries } = timer
  const duration =
    entries && entries.length > 0 ? entries.reduce((prev: number, curr: TimerEntry) => prev + curr.duration, 0) : timer.duration

  return format ? timerClock(duration, true) : duration
}

export const timersDuration = (timers: Timer[], format?: boolean): number | string => {
  const duration = timers.reduce((prev: number, curr: Timer) => prev + (timerDuration(curr) as number), 0)

  return format ? timerClock(duration, true) : duration
}

export const secondsLapsed = (start: Date): number => {
  return Math.floor((Date.now() - start.getTime()) / 1000)
}

export const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
}

export const formatTime = (date?: string | Date): string => {
  if (!date) return ''

  const d = new Date(date)

  let h = d.getHours()
  const m = d.getMinutes()
  const ampm = h >= 12 ? 'pm' : 'am'
  h = h % 12
  const hours = h ? h : 12 // the hour '0' should be '12'
  const minutes = m < 10 ? '0' + m : m

  return `${hours}:${minutes} ${ampm}`
}

export const timeToCost = (timer: Timer | Timer[], rate: number): string => {
  const seconds: number = Array.isArray(timer) ? (timersDuration(timer, false) as number) : (timerDuration(timer, false) as number)
  const hours: number = seconds / 60 / 60

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return formatter.format(hours * rate)
}
