import * as React from 'react'
import { connect } from 'react-redux'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { startTimer, stopTimer } from 'controllers/timerController'
import { formatClock } from 'helpers/stringHelper'
import ExternalLink from 'views/ui/ExternalLink'

import { Issue } from 'models/issue'
import { Timer, defaultTimerState } from 'models/timer'
import LabelsList from 'views/issues/LabelsList'
import TimerButton from 'views/issues/TimerButton'

interface Props {
  issue: Issue
  lane: string
  index: number
}

interface Connected {
  timer: Timer
  dispatch: (action: any) => any
}

const Card: React.SFC<Props & Connected> = ({ dispatch, timer, issue, lane, index }) => {

  const _timerHandler = () => {
    timer.isRunning ? dispatch(stopTimer(timer.id)) : dispatch(startTimer(timer.id))
  }

  let duration = timer.entries.length > 0 ? timer.entries.reduce((prev: any, curr: any) => prev + curr.duration, 0) : timer.duration

  return (
    <Draggable key={issue.id} draggableId={issue.id.toString()} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className={`card ${timer.isRunning && 'active'} ${snapshot.isDragging && 'dragging'}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="meta">
            <span className="header">{`${issue.ident}/#${issue.number}`}</span>
            <span className="description">{issue.title}</span>
            {issue.labels && issue.labels.length > 0 && <LabelsList labels={issue.labels} lane={lane} withoutLanes={true} />}
          </div>
          <div className="bar">
            <TimerButton timer={timer} handler={_timerHandler} />
            <span className="counter">{formatClock(timer.duration)}</span>
            <span className="tracked">{formatClock(duration)}</span>
            <ExternalLink showIcon={true} url={issue.htmlUrl} />
          </div>
        </div>
      )}
    </Draggable>
  )
}

const mapState = (state: any, props: Props) => ({
  timer: state.timers[props.issue.id] || { ...defaultTimerState, id: props.issue.id }
})

export default connect(mapState)(Card)
