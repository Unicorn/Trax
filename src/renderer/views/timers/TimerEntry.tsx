/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { RootState } from '@/models/app'
import { Timer } from '@/models/timer'
import { Issues } from '@/models/issue'
import { timerDuration } from '@/helpers/timerHelper'
import LabelItem from '@/views/issues/LabelItem'
import ExternalLink from '@/views/ui/ExternalLink'
import { defaultLanes } from '@/models/lane'

interface Props {
  timer: Timer
  checked: boolean
  handler: (e: React.FormEvent<HTMLInputElement>) => void
}

interface Connected {
  issues: Issues
}

const TimerEntry: SFC<Props & Connected> = ({ timer, checked, handler, issues }) => {
  if (!timer.issue) return null

  const issue = issues.data[timer.issue.key]
  const lane = (issue && issue.lane) || ''

  return (
    <tr>
      <td>
        <div className="input checkbox">
          <input type="checkbox" value={timer.key} onChange={handler} checked={checked} />
        </div>
      </td>
      <td>
        <ExternalLink url={timer.issue.repositoryUrl} showIcon={false}>
          {timer.issue.ident}
        </ExternalLink>
      </td>
      <td>
        <ExternalLink url={timer.issue.htmlUrl} showIcon={false}>
          #{timer.issue.number}
        </ExternalLink>
      </td>
      <td>
        <LabelItem label={defaultLanes[lane]} />
      </td>
      <td>{timerDuration(timer, true)}</td>
      <td>{timer.issue.title}</td>
    </tr>
  )
}

const mapState = (state: RootState): Connected => ({
  issues: state.issues
})

export default connect(mapState)(TimerEntry)
