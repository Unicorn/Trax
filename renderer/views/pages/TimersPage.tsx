import { keys } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'

import { Timers } from 'models/timer'
import { INVOICE } from 'models/invoice'

import TimerEntry from 'views/timers/TimerEntry'
import Help from 'views/layouts/Help'

interface Connected {
  timers: Timers
  dispatch: (action: any) => void
}

interface State {
  selectedIds: string[]
}

class ReportPage extends React.Component<Connected, State> {

  state = {
    selectedIds: []
  }

  _checkboxHandler = (e: React.FormEvent<HTMLInputElement>) => {
    let timerIds: string[] = [...this.state.selectedIds]
    let input = e.currentTarget

    if (input.checked)
      timerIds.push(input.value.toString())
    else
      timerIds = timerIds.filter(t => t !== input.value)

    this.setState({ selectedIds: timerIds })
  }

  _selectHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { timers } = this.props
    let timerIds = timers.keys
    let input = e.currentTarget

    this.setState({ selectedIds: input.checked ? timerIds : [] })
  }

  _createInvoice = () => {
    const { timers, dispatch } = this.props
    const { selectedIds } = this.state
    let invoice = { timers: selectedIds.map(id => timers[id]) }

    dispatch({ type: INVOICE.CREATE, invoice })
  }

  render() {
    const { timers } = this.props
    const { selectedIds } = this.state

    return (
      <section className="report page">
        <Help><p>When you track time on individual github issues, they show up here. You can select these at any time to convert them to a report or invoice.</p></Help>

        <table cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <th><div className="input checkbox"><input type="checkbox" onChange={this._selectHandler} /></div></th>
              <th>Repo</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Description</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {timers.keys.map((key: string) => (
              <TimerEntry
                timer={timers.data[key]}
                key={key}
                handler={this._checkboxHandler}
                checked={(selectedIds as string[]).includes(key)}
              />
            ))}
          </tbody>
        </table>

        <div className={`action-bar ${selectedIds.length > 0 && 'active'}`}>
          <button className="brown basic button" onClick={this._createInvoice}>Create Invoice</button>
          <button className="red basic button">Cancel</button>
        </div>
      </section>
    )
  }
}

const mapState = (state: any) => ({
  timers: state.timers,
})

export default connect(mapState)(ReportPage)
