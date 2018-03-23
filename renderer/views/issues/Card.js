import React from 'react'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'
import { parameterize } from 'helpers/traxHelper'
import ExternalLink from 'views/ui/ExternalLink'
import { startTimer, stopTimer } from 'controllers/timerController'
import TimerStartIcon from 'views/ui/icons/TimerStartIcon'
import TimerStopIcon from 'views/ui/icons/TimerStopIcon'

const select = (state, props) => {
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

const renderDuration = data => {
  let duration = Array.isArray(data)
    ? data.reduce((prev, curr) => {
        return prev + curr.duration
      }, 0)
    : data

  let hours = ('0' + Math.floor(duration / (60 * 60)).toString()).slice(-2)
  let divisor_for_minutes = duration % (60 * 60)
  let minutes = ('0' + Math.floor(divisor_for_minutes / 60).toString()).slice(
    -2
  )

  let divisor_for_seconds = divisor_for_minutes % 60
  let seconds = ('0' + Math.ceil(divisor_for_seconds).toString()).slice(-2)

  let formatted = `${hours}:${minutes}:${seconds}`

  return duration > 0 ? formatted : '00:00:00'
}

const Card = ({ dispatch, timer, issue, lane, index, provided, snapshot }) => {
  const _renderLabels = () => {
    let items = issue.labels.filter(l => l.name !== lane).map(l => (
      <span
        style={{ backgroundColor: `#${l.color}` }}
        key={l.name}
        className={`label label-${parameterize(l.name)}`}
      >
        {l.name}
      </span>
    ))

    return <div className="labels">{items}</div>
  }

  const _timerHandler = e => {
    e.preventDefault()

    if (timer.isRunning) dispatch(stopTimer(issue.id))
    else dispatch(startTimer(issue.id))
  }

  return (
    <Draggable key={issue.id} draggableId={issue.id} index={index}>
      {(provided, snapshot) => (
        <div>
          <div
            className={`card ${timer.isRunning &&
              'active'} ${snapshot.isDragging && 'dragging'}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="meta">
              <span className="header">{`${issue.owner}/${issue.repo}/#${
                issue.number
              }`}</span>
              <span className="description">{issue.title}</span>
              {issue.labels && issue.labels.length > 0 && _renderLabels()}
            </div>
            <div className="bar">
              <button className={`timer `} onClick={_timerHandler}>
                {timer.isRunning ? <TimerStopIcon /> : <TimerStartIcon />}
              </button>
              <span className="counter">{renderDuration(timer.counter)}</span>
              <span className="tracked">{renderDuration(timer.entries)}</span>
              <ExternalLink showIcon={true} url={issue.html_url} />
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  )
}

export default connect(select)(Card)
