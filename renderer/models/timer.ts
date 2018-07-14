export const TIMER = {
  START: 'trax/timer/START',
  STOP: 'trax/timer/STOP',
  TICK_TIMER: 'trax/timer/TICK_TIMER',
  SET_SELECTED: 'trax/timer/SET_SELECTED',
  SET_INVOICED: 'trax/timer/SET_INVOICED',
}

export interface TimerEntry {
  startedAt: Date;
  stoppedAt: Date;
  duration: number;
}

export interface Timer {
  id: number;
  invoiced?: boolean;
  selected?: boolean;
  isRunning?: boolean;
  startedAt?: Date;
  counter?: number;
  timer?: number;
  entries?: TimerEntry[];
}

export interface StartTimer {
  type: typeof TIMER.START
  payload?: Timer
}

export interface StopTimer {
  type: typeof TIMER.STOP
  payload?: Timer
}

export type TimerAction = StartTimer | StopTimer
