export const TIMER = {
  START: 'trax/timer/START',
  STOP: 'trax/timer/STOP',
  TICK: 'trax/timer/TICK_TIMER',
}

export interface TimerEntry {
  startedAt: Date;
  stoppedAt: Date;
  duration: number;
}

export interface Timer {
  id: number;
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
  type: typeof TIMER.START | typeof TIMER.STOP | typeof TIMER.TICK
  id: number
}

export const defaultTimerState: Timer = {
  id: 0,
  isRunning: false,
  duration: 0,
  entries: [],
}
