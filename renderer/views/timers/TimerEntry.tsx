import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from 'models'
import { Tracks } from 'models/track'
import { Timer } from 'models/timer'

interface Props {
  timer: Timer
}

interface Connected {
  tracks: Tracks
}

const TimerEntry: React.SFC<Props & Connected> = (props) => {
  const { timer, tracks } = props

  console.log('timer', timer, tracks)

  return (
    <tr>
      <td>Running: {timer.isRunning}</td>
    </tr>
  )
}

const mapState = (state: AppState) => ({
  tracks: state.tracks
})

export default connect(mapState)(TimerEntry)
