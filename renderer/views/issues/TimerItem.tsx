import * as React from 'react'
import { Timer } from 'models/timer'
import TimerStartIcon from 'views/ui/icons/TimerStartIcon'
import TimerStopIcon from 'views/ui/icons/TimerStopIcon'

interface Props {
  timer: Timer
  handler: () => void
}

const TimerItem: React.SFC<Props> = ({ handler, timer }) => (
  <button className={`timer `} onClick={handler}>
    {timer.isRunning ? <TimerStopIcon /> : <TimerStartIcon />}
  </button>
)

export default TimerItem
