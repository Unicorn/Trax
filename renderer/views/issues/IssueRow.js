import React from 'react'
import { connect } from 'react-redux'
import ExternalLink from 'views/ui/ExternalLink'
import { setSelected } from 'controllers/timerController'

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

  let hours = `0${Math.floor(duration / (60 * 60))}`.slice(-2)
  let divisor_for_minutes = duration % (60 * 60)
  let minutes = `0${Math.floor(divisor_for_minutes / 60)}`.slice(-2)

  let divisor_for_seconds = divisor_for_minutes % 60
  let seconds = `0${Math.ceil(divisor_for_seconds)}`.slice(-2)

  return duration > 0 ? `${hours}:${minutes}:${seconds}` : '00:00:00'
}

const renderDateRange = data => {
  const options = { weekday: 'short', month: 'short', day: 'numeric' }
  const startDate = new Date(data[0].startedAt).toLocaleDateString(
    'en-US',
    options
  )
  const endDate = new Date(data.slice(-1)[0].stoppedAt).toLocaleDateString(
    'en-US',
    options
  )

  if (startDate === endDate) return startDate

  return `${startDate} - ${endDate}`
}

const IssueRow = ({ timer, issue, dispatch }) => {
  return (
    <tr>
      <td width="20px">
        <div className="input checkbox">
          <input
            type="checkbox"
            checked={timer.selected}
            onChange={() => dispatch(setSelected(timer.id, !timer.selected))}
          />
        </div>
      </td>
      <td>
        {issue.owner}/{issue.repo}
      </td>
      <td>
        <ExternalLink showIcon={false} url={issue.html_url}>
          #{issue.number}
        </ExternalLink>
      </td>
      <td>{renderDateRange(timer.entries)}</td>
      <td>{renderDuration(timer.entries)}</td>
      <td>{timer.invoiced && 'invoiced'}</td>
    </tr>
  )
}

export default connect(select)(IssueRow)
