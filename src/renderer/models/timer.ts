import { v4 } from 'uuid'
import { Resources, Resource } from 'horseshoes'
import { Issue } from '@/models/issue'

export enum TIMER {
  START = 'trax/timer/start',
  RESTART = 'trax/timer/restart',
  STOP = 'trax/timer/stop',
  TICK = 'trax/timer/tick',
  RESET = 'trax/timer/reset',
  DELETE = 'trax/timer/delete'
}

export const defaultTimer: Timer = {
  key: v4(),
  isRunning: false,
  issue: null,
  entries: [],
  duration: 0,
  startedAt: null
}

export interface TimerEntry {
  startedAt: null | Date
  stoppedAt: null | Date
  duration: number
}

export interface Timer extends Resource {
  duration: number
  isRunning: boolean
  readonly issue: null | Issue
  entries: TimerEntry[]
  startedAt: null | Date
}

export interface Timers extends Resources<Timer> {
  debug?: boolean // Stubbed
}

export interface TimerAction {
  readonly type: TIMER
  readonly payload?: Timer
}
