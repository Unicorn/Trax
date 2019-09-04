/** @jsx createElement **/
import { createElement, SFC, Fragment } from 'react'
import { connect } from 'react-redux'
import { toArray } from 'horseshoes'
import { RootState } from '@/models/app'
import { Invoices, Invoice } from '@/models/invoice'
import { Timer } from '@/models/timer'
import { timersDuration, timerDuration } from '@/helpers/timerHelper'

interface Connected {
  invoices: Invoices
}

const renderTimerEntry = (timer: Timer) => {
  console.log('timer in renderTimerEntry', timer)

  return (
    <tr className="detail">
      <td>{timer.issue && timer.issue.title}</td>
      <td>startedAt - stoppedAt</td>
      <td>{timerDuration(timer, true)}</td>
      <td>
        <button className="button micro yellow">Edit</button>
        <button className="button micro red">Delete</button>
      </td>
    </tr>
  )
}

const InvoicesPage: SFC<Connected> = props => {
  const invoices: Invoice[] = toArray(props.invoices) as Invoice[]

  console.log('InvoicesPage', invoices[0].timers)

  return (
    <section className="invoice page">
      <h1>Invoice</h1>

      <table className="clickable collapsed" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <Fragment key={invoice.key}>
              <tr>
                <td>{invoice.key}</td>
                <td>{new Date(invoice.createdAt || '').toString()}</td>
                <td>{timersDuration(invoice.timers, true)}</td>
                <td><button className="button micro brown">Download</button></td>
              </tr>
              {invoice.timers.map(renderTimerEntry)}
            </Fragment>
          ))}
        </tbody>
      </table>
    </section>
  )
}

const mapState = (state: RootState): Connected => ({
  invoices: state.invoices,
})

export default connect(mapState)(InvoicesPage)
