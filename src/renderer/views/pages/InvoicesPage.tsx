/** @jsx createElement **/
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'

import { AppState, toArray } from '@/models/app'
import { Invoices, Invoice } from '@/models/invoice'
import { timersDuration } from '@/helpers/timerHelper'

interface Connected {
  invoices: Invoices
}

const InvoicesPage: SFC<Connected> = props => {
  const invoices: Invoice[] = toArray(props.invoices) as Invoice[]

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
          {invoices.map(invoice => (
            <tr key={invoice.key}>
              <td>{invoice.key}</td>
              <td>{new Date(invoice.createdAt || '').toString()}</td>
              <td>{timersDuration(invoice.timers, true)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

const mapState = (state: AppState) => ({
  invoices: state.invoices
})

export default connect(mapState)(InvoicesPage)
