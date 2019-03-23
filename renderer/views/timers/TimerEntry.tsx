import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from 'models/app'
import { Timer } from 'models/timer'
import { Issues } from 'models/issue'
import { timerDuration } from 'helpers/timerHelper'
import LabelItem from 'views/issues/LabelItem'
import ExternalLink from 'views/ui/ExternalLink'
import { SWIMLANES } from 'config/constants'

interface Props {
  timer: Timer
  checked: boolean
  handler: (e: React.FormEvent<HTMLInputElement>) => void
}

interface Connected {
  issues:  Issues
}

const TimerEntry: React.SFC<Props & Connected> = (props) => {
  const { timer, checked, handler, issues } = props

  if (!timer.issue)
    return null

  const issue = issues.data[timer.issue.key]
  const lane = issue && issue.lane || ''

  return (
    <tr>
      <td>
        <div className="input checkbox">
          <input type="checkbox" value={timer.issue.id} onChange={handler} checked={checked} />
        </div>
      </td>
      <td><ExternalLink url={timer.issue.repositoryUrl} showIcon={false}>{timer.issue.ident}</ExternalLink></td>
      <td><ExternalLink url={timer.issue.htmlUrl} showIcon={false}>#{timer.issue.number}</ExternalLink></td>
      <td><LabelItem label={SWIMLANES[lane]} /></td>
      <td>{timerDuration(timer, true)}</td>
      <td>{timer.issue.title}</td>
    </tr>
  )
}

const mapState = (state: AppState) => ({
  issues: state.issues
})

export default connect(mapState)(TimerEntry)
