/** @jsx createElement */
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { startTimer, stopTimer } from '@/controllers/timerController'
import { timerDuration } from '@/helpers/timerHelper'
import ExternalLink from '@/views/ui/ExternalLink'

import { RootState } from '@/models/app'
import { Issue } from '@/models/issue'
import { Timers, Timer, TimerAction, defaultTimer } from '@/models/timer'
import { pointsFromLabels, typeFromLabels, priorityFromLabels } from '@/helpers/labelHelper'
import LabelsList from '@/views/issues/LabelsList'
import TimerButton from '@/views/issues/TimerButton'
import PointsIcon from '@/views/ui/icons/PointsIcon'
import TypeIcon from '@/views/ui/icons/TypeIcon'
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
  startTimer: (payload: Timer) => TimerAction
  stopTimer: (payload: Timer) => TimerAction
}

const Card: SFC<Props & Connected & Actions> = ({ timers, settings, issue, index }) => {
  const timer = timers.data[issue.key] || { ...defaultTimer, key: issue.key, issue, startedAt: new Date() }

  const _timerHandler = (): void => {
    timer.isRunning ? stopTimer(timer) : startTimer(timer)
  }

  const priority = priorityFromLabels(issue.labels)
  const points = pointsFromLabels(issue.labels)
  const type = typeFromLabels(issue.labels)
  const tracked = timerDuration(timer, true)

  let className = `card ${timer.isRunning ? 'active' : ''} ${type} `
  className += settings.featurePriority ? `priority priority-${priority} ` : ''
  className += settings.featurePoints ? `points-${points} ` : ''

  return (
    <Draggable key={issue.key} draggableId={issue.key} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className={`${className} ${snapshot.isDragging ? 'dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <header>
            <strong>{`${issue.ident}/#${issue.number}`}</strong>
            {settings.featureTypes && type && (
              <i className="type">
                <TypeIcon type={type} />
              </i>
            )}
            {settings.featurePoints && points > 0 && (
              <i className="points">
                <PointsIcon points={points} />
              </i>
            )}
          </header>

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
  startTimer,
  stopTimer
}

export default connect(
  mapState,
  mapDispatch
)(Card)
