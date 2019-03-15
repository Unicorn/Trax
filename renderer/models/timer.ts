export enum TIMER {
  START = 'trax/timer/START',
  STOP = 'trax/timer/STOP',
  TICK = 'trax/timer/TICK_TIMER',
}

export interface TimerEntry {
  startedAt: Date;
  stoppedAt: Date;
  duration: number;
}

export interface Timer {
  id: string | null
  duration: number
  invoiced?: boolean
  selected?: boolean
  isRunning: boolean
  startedAt?: Date
  entries: TimerEntry[]
}

export type Timers = {
  [key: string]: Timer
}

export type TimerAction = {
  readonly type: TIMER
  readonly id?: string
}

export const defaultTimerState: Timer = {
  id: null,
  isRunning: false,
  duration: 0,
  entries: [],
}
