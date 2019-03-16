import { keys } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { Timers } from 'models/timer'
import TimerEntry from 'views/timers/TimerEntry'
import Help from 'views/layouts/Help'
interface Connected {
  timers: Timers
}

const Report: React.SFC<Connected> = (props) => {

  const { timers } = props

  return (
    <section className="report page">
      <Help><p>When you track time on individual github issues, they show up here. You can select these at any time to convert them to a report or invoice.</p></Help>

      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th></th>
            <th>Repo</th>
            <th>Issue</th>
            <th>Status</th>
            <th>Description</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {keys(timers).map((key: string) => <TimerEntry timer={timers[key]} key={key} />)}
        </tbody>
      </table>
    </section>
  )
}

const mapState = (state: any) => ({
  timers: state.timers,
})

export default connect(mapState)(Report)
