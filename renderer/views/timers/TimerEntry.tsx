import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from 'models'
import { Repos } from 'models/repo'
import { Timer } from 'models/timer'

interface Props {
  timer: Timer
}

interface Connected {
  repos: Repos
}

const TimerEntry: React.SFC<Props & Connected> = (props) => {
  const { timer, repos } = props
  let repo = timer.id ? repos.entities.repos[timer.id] : null

  return (
    <tr>
      <td>Running: {timer.isRunning}</td>
      <td>{repo && repo.fullName}</td>
    </tr>
  )
}

const mapState = (state: AppState) => ({
  repos: state.repos
})

export default connect(mapState)(TimerEntry)
