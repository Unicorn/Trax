export type TTimerEntry = {
  startedAt: Date;
  stoppedAt: Date;
  duration: number;
}

export type TTimer = {
  invoiced: boolean;
  selected: boolean;
  isRunning: boolean;
  startedAt: Date;
  counter: number;
  timer: number;
  entries: TTimerEntry[];
}
