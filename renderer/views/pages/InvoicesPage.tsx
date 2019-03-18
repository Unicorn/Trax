import { keys } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'

import { AppState, Invoices } from 'models'
import { timersDuration } from 'helpers/timerHelper'

interface Connected {
  invoices: Invoices
}

const InvoicesPage: React.SFC<Connected> = (props) => {
  const invoices = keys(props.invoices).map(key => props.invoices[key])

  return (
    <section className="invoice page">
      <h1>Invoice</h1>

      <table cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Created On</th>
            <th>Total Time</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(i => (
            <tr>
              <td>{i.id}</td>
              <td>{i.createdAt}</td>
              <td>{timersDuration(i.timers, true)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

const mapState = (state: AppState) =>({
  invoices: state.invoices
})

export default connect(mapState)(InvoicesPage)
