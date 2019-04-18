import * as React from 'react'
import { connect } from 'react-redux'
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { startTimer, stopTimer } from 'controllers/timerController'
import { timerDuration } from 'helpers/timerHelper'
import ExternalLink from 'views/ui/ExternalLink'

import { AppState } from 'models/app'
import { Issue } from 'models/issue'
import { Timers, defaultTimer } from 'models/timer'
import { pointsFromLabels, typeFromLabels } from 'helpers/labelHelper'
import LabelsList from 'views/issues/LabelsList'
import TimerButton from 'views/issues/TimerButton'
import PointsIcon from 'views/ui/icons/PointsIcon'
import TypeIcon from 'views/ui/icons/TypeIcon'

interface Props {
  issue: Issue
  lane: string
  index: number
}

interface Connected {
  timers: Timers
  dispatch: (action: any) => any
}

const Card: React.SFC<Props & Connected> = (props) => {

  const { dispatch, timers, issue, index } = props

  const timer = timers.data[issue.key] || { ...defaultTimer, key: issue.key, issue, startedAt: new Date() }

  const _timerHandler = () => {
    timer.isRunning ? dispatch(stopTimer(timer)) : dispatch(startTimer(timer))
  }

  const points = pointsFromLabels(issue.labels)
  const type = typeFromLabels(issue.labels)
  const tracked = timerDuration(timer, true)

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
            <strong>
              <TypeIcon type={type} />
              {`${issue.ident}/#${issue.number}`}
            </strong>
            {points > 0 && <PointsIcon points={points} />}
          </header>

          <div className="description">
            {tracked && <div className="tracked"><b>Total Time:</b> <i>{tracked}</i></div>}
            <p>{issue.title}</p>
          </div>

          {issue.labels && issue.labels.length > 0 && <LabelsList labels={issue.labels} filterCoreLabels={true} />}

          <footer>
            <TimerButton timer={timer} handler={_timerHandler} />
            <ExternalLink showIcon={true} url={issue.htmlUrl} />
          </footer>
        </div>
      )}
    </Draggable>
  )
}

const mapState = (state: AppState) => ({
  timers: state.timers
})

export default connect(mapState)(Card)
