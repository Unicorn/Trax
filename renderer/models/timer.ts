export interface TimerEntry {
  startedAt: Date;
  stoppedAt: Date;
  duration: number;
}

export interface Timer {
  invoiced: boolean;
  selected: boolean;
  isRunning: boolean;
  startedAt: Date;
  counter: number;
  timer: number;
  entries: TimerEntry[];
}
