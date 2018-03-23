import React from 'react'
import { connect } from 'react-redux'
import { parameterize } from 'helpers/traxHelper'
import ExternalLink from 'views/ui/ExternalLink'
import formatClock from 'helpers/traxHelper'

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
  return formatClock(duration)
}

const IssueItem = ({ timer, issue }) => {
  const _renderLabels = () => {
    let items = issue.labels.map(l => (
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

  return (
    <div className="card">
      <div className="meta">
        <span className="header">{`${issue.owner}/${issue.repo}/#${
          issue.number
        }`}</span>
        <span className="description">{issue.title}</span>
        {issue.labels && issue.labels.length > 0 && _renderLabels()}
      </div>
      <div className="bar">
        <span className="counter">{renderDuration(timer.counter)}</span>
        <span className="tracked">{renderDuration(timer.entries)}</span>
        <ExternalLink showIcon={true} url={issue.html_url} />
      </div>
    </div>
  )
}

export default connect(select)(IssueItem)
