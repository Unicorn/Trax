import * as React from 'react'
import { connect } from 'react-redux'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { formatClock } from 'helpers/stringHelper'
import ExternalLink from 'views/ui/ExternalLink'
import { startTimer, stopTimer } from 'controllers/timerController'
import TimerStartIcon from 'views/ui/icons/TimerStartIcon'
import TimerStopIcon from 'views/ui/icons/TimerStopIcon'
import { Issue } from 'models/issue'
import { Timer } from 'models/timer'
import LabelsList from 'views/issues/LabelsList'

interface Props {
  issue: Issue
  timer?: Timer
  lane: string
  index: number
  provided: any
  snapshot: any
}

interface Connected {
  dispatch: (action: any) => any
}

const Card: React.SFC<Props & Connected> = ({ dispatch, timer, issue, lane, index, provided, snapshot }) => {

  const _timerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (timer.isRunning)
      dispatch(stopTimer({ id: issue.id }))
    else
      dispatch(startTimer({ id: issue.id }))
  }

  let duration = Array.isArray(timer.counter) ? timer.counter.reduce((prev: any, curr: any) => prev + curr.duration, 0) : timer.counter

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
            <button className={`timer `} onClick={_timerHandler}>
              {timer.isRunning ? <TimerStopIcon /> : <TimerStartIcon />}
            </button>
            <span className="counter">{formatClock(duration)}</span>
            <span className="tracked">{formatClock(duration)}</span>
            <ExternalLink showIcon={true} url={issue.htmlUrl} />
          </div>
        </div>
      )}
    </Draggable>
  )
}

const mapState = (state: any, props: Props) => {
  let timer = state.timer[props.issue.id] || {
    isRunning: false,
    startedAt: null,
    counter: 0,
    entries: [],
  }

  return {
    timer,
  }
}

export default connect(mapState)(Card)
