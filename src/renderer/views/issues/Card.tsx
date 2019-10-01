/** @jsx createElement */
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { startTimer, stopTimer } from '@/controllers/timerController'
import { timerDuration } from '@/helpers/timerHelper'
import ExternalLink from '@/views/ui/ExternalLink'

import { RootState } from '@/models/app'
import { Issue } from '@/models/issue'
import { Timers, defaultTimer } from '@/models/timer'

import LabelsList from '@/views/issues/LabelsList'
import CardHeader from '@/views/issues/CardHeader'
import TimerButton from '@/views/issues/TimerButton'

import { Settings } from '@/models/setting'

interface Props {
  issue: Issue
  lane: string
  index: number
}

interface Connected {
  timers: Timers
  settings: Settings
}

interface Actions {
  _startTimer: typeof startTimer
  _stopTimer: typeof stopTimer
}

const Card: SFC<Props & Connected & Actions> = ({ timers, settings, issue, index, _startTimer, _stopTimer }) => {
  const timer = timers.data[issue.key] || { ...defaultTimer, key: issue.key, issue, startedAt: new Date() }
  const tracked = timerDuration(timer, true)
  const className = `card ${timer.isRunning ? 'active' : ''}`

  const _timerHandler = (): void => {
    timer.isRunning ? _stopTimer(timer) : _startTimer(timer)
  }

  return (
    <Draggable key={issue.key} draggableId={issue.key} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className={`${className} ${snapshot.isDragging ? 'dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardHeader issue={issue} settings={settings} />

          <div className="description">
            {tracked && (
              <div className="tracked">
                <b>Total Time:</b> <i>{tracked}</i>
              </div>
            )}
            <p>{issue.title}</p>
          </div>

          {issue.labels && issue.labels.length > 0 && <LabelsList labels={issue.labels} filterCore={true} />}

          <footer>
            <TimerButton timer={timer} handler={_timerHandler} />
            <ExternalLink showIcon={true} url={issue.htmlUrl} />
          </footer>
        </div>
      )}
    </Draggable>
  )
}

const mapState = (state: RootState): Connected => ({
  timers: state.timers,
  settings: state.settings
})

const mapDispatch: Actions = {
  _startTimer: startTimer,
  _stopTimer: stopTimer
}

export default connect(
  mapState,
  mapDispatch
)(Card)
