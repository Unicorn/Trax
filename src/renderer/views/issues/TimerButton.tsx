import * as React from 'react'
import { Timer } from '@/models/timer'
import TimerStartIcon from '@/views/ui/icons/TimerStartIcon'
import TimerStopIcon from '@/views/ui/icons/TimerStopIcon'
import { timerClock } from '@/helpers/timerHelper'

interface Props {
  timer: Timer
  handler: () => void
}

const TimerButton: React.SFC<Props> = ({ handler, timer }) => (
  <div className="timer">
    <button onClick={handler}>{timer.isRunning ? <TimerStopIcon /> : <TimerStartIcon />}</button>
    <span className="counter">{timerClock(timer.duration)}</span>
  </div>
)

export default TimerButton
