import * as React from 'react'
import { connect } from 'react-redux'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { startTimer, stopTimer } from 'controllers/timerController'
import { timerDuration } from 'helpers/timerHelper'
import ExternalLink from 'views/ui/ExternalLink'

import { Issue } from 'models/issue'
import { Timer } from 'models/timer'
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
    timer.isRunning ? dispatch(stopTimer(issue)) : dispatch(startTimer(issue))
  }

  return (
    <Draggable key={issue.key} draggableId={issue.key} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          className={`card ${timer.isRunning && 'active'} ${snapshot.isDragging && 'dragging'}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <header>
            <strong>{`${issue.ident}/#${issue.number}`}</strong>
            <span className="tracked">{timerDuration(timer, true)}</span>
          </header>

          <div className="description">
            {issue.title}
          </div>

          {issue.labels && issue.labels.length > 0 && <LabelsList labels={issue.labels} lane={lane} withoutLanes={true} />}

          <footer>
            <TimerButton timer={timer} handler={_timerHandler} />
            <ExternalLink showIcon={true} url={issue.htmlUrl} />
          </footer>
        </div>
      )}
    </Draggable>
  )
}

const mapState = (state: any, props: Props) => ({
  timer: state.timers[props.issue.id] || { isRunning: false, issue: props.issue, entries: 0, duration: 0 }
})

export default connect(mapState)(Card)
