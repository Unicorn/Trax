import { keys } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { Timers } from 'models/timer'
import TimerEntry from 'views/timers/TimerEntry'

interface Connected {
  timers: Timers
}

const Report: React.SFC<Connected> = (props) => {

  const { timers } = props

  return (
    <section className="report page">
      <header className="title">
        <h1>Time Entries</h1>
        <div className="actions">
          <button className="brown basic micro button">Generate Invoice</button>
        </div>
      </header>

      <table>
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
