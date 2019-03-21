import { Issue } from 'models/issue'

export enum TIMER {
  START = 'trax/timer/START',
  STOP = 'trax/timer/STOP',
  TICK = 'trax/timer/TICK_TIMER',
  DELETE = 'trax/timer/DELETE'
}

export interface TimerEntry {
  startedAt: Date
  stoppedAt: Date
  duration: number
}

export interface Timer {
  id: string
  duration: number
  selected?: boolean
  isRunning: boolean
  startedAt?: Date
  readonly issue: Issue
  entries: TimerEntry[]
}

export interface Timers {
  [key: string]: Timer
}

export interface TimerAction {
  readonly type: TIMER
  readonly id?: string
  readonly timer?: Timer
  readonly issue?: Issue
}
