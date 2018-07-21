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
  id?: number;
  duration: number;
  invoiced?: boolean;
  selected?: boolean;
  isRunning: boolean;
  startedAt?: Date;
  entries: TimerEntry[];
}

export type Timers = {
  [key: number]: Timer
}

export type TimerAction = {
  readonly type: TIMER
  readonly id?: number
}

export const defaultTimerState: Timer = {
  isRunning: false,
  duration: 0,
  entries: [],
}
